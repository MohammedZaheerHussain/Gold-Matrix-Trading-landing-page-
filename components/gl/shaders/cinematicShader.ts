export const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    // Film grain - subtle for 4K
    uGrainIntensity: { value: 0.04 },
    uGrainSize: { value: 2.0 },
    // Chromatic aberration - subtle radial
    uChromaticAberration: { value: 0.0015 },
    // Bloom - soft glow
    uBloomIntensity: { value: 0.18 },
    uBloomThreshold: { value: 0.55 },
    uBloomRadius: { value: 0.012 },
    // Color grading - cinematic teal/orange
    uContrast: { value: 1.08 },
    uSaturation: { value: 1.12 },
    uExposure: { value: 1.02 },
    uGamma: { value: 0.95 },
    // Vignette - soft anamorphic
    uVignetteDarkness: { value: 0.8 },
    uVignetteOffset: { value: 0.4 },
    // Sharpening for 4K clarity
    uSharpen: { value: 0.15 },
    // Resolution
    uResolution: { value: [3840, 2160] }, // 4K default
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGrainIntensity;
    uniform float uGrainSize;
    uniform float uChromaticAberration;
    uniform float uBloomIntensity;
    uniform float uBloomThreshold;
    uniform float uBloomRadius;
    uniform float uContrast;
    uniform float uSaturation;
    uniform float uExposure;
    uniform float uGamma;
    uniform float uVignetteDarkness;
    uniform float uVignetteOffset;
    uniform float uSharpen;
    uniform vec2 uResolution;
    varying vec2 vUv;
    
    // ============================================
    // INDUSTRY-STANDARD FUNCTIONS
    // ============================================
    
    // High-quality hash for film grain
    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }
    
    // Perlin-style grain for organic texture
    float filmGrain(vec2 uv, float time) {
      vec2 grainUv = uv * uResolution / uGrainSize;
      float grain = hash12(grainUv + fract(time * 0.1));
      // Add temporal variation
      grain += hash12(grainUv * 1.5 + fract(time * 0.15)) * 0.5;
      grain += hash12(grainUv * 2.0 + fract(time * 0.2)) * 0.25;
      return grain / 1.75;
    }
    
    // Sub-pixel chromatic aberration
    vec3 chromaticAberration(sampler2D tex, vec2 uv, float amount) {
      vec2 dir = uv - 0.5;
      float dist = length(dir);
      
      // Cubic falloff for natural lens distortion
      float aberration = amount * dist * dist * dist;
      
      // Sample with sub-pixel precision
      vec2 redOffset = dir * aberration * 1.0;
      vec2 blueOffset = dir * aberration * -0.8;
      
      float r = texture2D(tex, uv + redOffset).r;
      float g = texture2D(tex, uv).g;
      float b = texture2D(tex, uv + blueOffset).b;
      
      return vec3(r, g, b);
    }
    
    // Gaussian-weighted bloom (9-tap)
    vec3 bloom(sampler2D tex, vec2 uv, float threshold, float intensity, float radius) {
      vec3 color = vec3(0.0);
      float totalWeight = 0.0;
      
      // Gaussian weights for 9 samples
      float weights[9];
      weights[0] = 0.0162; weights[1] = 0.0540; weights[2] = 0.1216;
      weights[3] = 0.1945; weights[4] = 0.2270; weights[5] = 0.1945;
      weights[6] = 0.1216; weights[7] = 0.0540; weights[8] = 0.0162;
      
      for (int i = 0; i < 9; i++) {
        float offset = (float(i) - 4.0) * radius;
        
        // Horizontal samples
        vec3 sampleH = texture2D(tex, uv + vec2(offset, 0.0)).rgb;
        float lumH = dot(sampleH, vec3(0.2126, 0.7152, 0.0722)); // Rec.709
        float maskH = smoothstep(threshold, threshold + 0.2, lumH);
        color += sampleH * maskH * weights[i];
        
        // Vertical samples
        vec3 sampleV = texture2D(tex, uv + vec2(0.0, offset)).rgb;
        float lumV = dot(sampleV, vec3(0.2126, 0.7152, 0.0722));
        float maskV = smoothstep(threshold, threshold + 0.2, lumV);
        color += sampleV * maskV * weights[i];
        
        totalWeight += weights[i] * 2.0;
      }
      
      return (color / totalWeight) * intensity;
    }
    
    // ACES Filmic Tonemapping (industry standard)
    vec3 ACESFilm(vec3 x) {
      float a = 2.51;
      float b = 0.03;
      float c = 2.43;
      float d = 0.59;
      float e = 0.14;
      return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
    }
    
    // Cinematic color grading with lift/gamma/gain
    vec3 colorGrade(vec3 color, float contrast, float saturation, float exposure, float gamma) {
      // Exposure (stop-based)
      color *= pow(2.0, (exposure - 1.0) * 3.0);
      
      // S-curve contrast (film-like)
      color = pow(color, vec3(1.0 / gamma));
      vec3 pivot = vec3(0.18); // 18% gray
      color = pivot + (color - pivot) * contrast;
      
      // Saturation with luminance preservation
      float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
      color = mix(vec3(lum), color, saturation);
      
      // Cinematic teal shadows / orange highlights (subtle)
      vec3 shadows = vec3(0.0, 0.02, 0.04); // Teal push in shadows
      vec3 highlights = vec3(0.02, 0.01, -0.01); // Orange push in highlights
      color += shadows * (1.0 - lum) * 0.5;
      color += highlights * lum * 0.5;
      
      return color;
    }
    
    // Anamorphic vignette (1.85:1 feel)
    float cinematicVignette(vec2 uv, float darkness, float offset) {
      vec2 coord = (uv - 0.5) * 2.0;
      
      // Anamorphic stretch
      coord.x *= 0.75;
      
      // Smooth radial falloff
      float dist = length(coord);
      float vignette = 1.0 - smoothstep(offset, offset + darkness, dist * dist);
      
      // Cubic smoothing for natural falloff
      vignette = vignette * vignette * (3.0 - 2.0 * vignette);
      
      return vignette;
    }
    
    // Anamorphic lens flare (horizontal streaks)
    vec3 anamorphicFlare(sampler2D tex, vec2 uv) {
      vec3 flare = vec3(0.0);
      
      // 17-tap horizontal blur for streak
      for (int i = -8; i <= 8; i++) {
        float offset = float(i) * 0.006;
        vec2 sampleUv = uv + vec2(offset, 0.0);
        vec3 texSample = texture2D(tex, sampleUv).rgb;
        float lum = dot(texSample, vec3(0.2126, 0.7152, 0.0722));
        
        // Threshold and falloff
        float mask = smoothstep(0.65, 0.85, lum);
        float weight = 1.0 - abs(float(i)) / 8.0;
        weight = weight * weight * weight; // Cubic falloff
        
        flare += texSample * mask * weight;
      }
      
      // Gold/amber tint for trading theme
      flare *= vec3(1.0, 0.85, 0.6);
      
      return flare * 0.12;
    }
    
    // Unsharp mask for 4K clarity
    vec3 sharpen(sampler2D tex, vec2 uv, float amount) {
      vec2 texel = 1.0 / uResolution;
      
      vec3 center = texture2D(tex, uv).rgb;
      vec3 blur = texture2D(tex, uv + texel * vec2(-1.0, -1.0)).rgb;
      blur += texture2D(tex, uv + texel * vec2(1.0, -1.0)).rgb;
      blur += texture2D(tex, uv + texel * vec2(-1.0, 1.0)).rgb;
      blur += texture2D(tex, uv + texel * vec2(1.0, 1.0)).rgb;
      blur *= 0.25;
      
      return center + (center - blur) * amount;
    }
    
    // Film halation (glow around bright areas, film characteristic)
    vec3 halation(vec3 color, float threshold) {
      float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
      float mask = smoothstep(threshold, threshold + 0.3, lum);
      
      // Red-shifted halation (characteristic of film)
      vec3 halo = color * vec3(1.1, 0.95, 0.85) * mask * 0.08;
      
      return halo;
    }
    
    void main() {
      // 1. Sub-pixel sharpening for 4K clarity
      vec3 color = sharpen(tDiffuse, vUv, uSharpen);
      
      // 2. Chromatic aberration (subtle lens imperfection)
      color = mix(color, chromaticAberration(tDiffuse, vUv, uChromaticAberration), 0.7);
      
      // 3. Bloom (soft glow from highlights)
      vec3 bloomColor = bloom(tDiffuse, vUv, uBloomThreshold, uBloomIntensity, uBloomRadius);
      color += bloomColor;
      
      // 4. Anamorphic lens flare
      vec3 flare = anamorphicFlare(tDiffuse, vUv);
      color += flare;
      
      // 5. ACES tonemapping (HDR to SDR)
      color = ACESFilm(color);
      
      // 6. Color grading
      color = colorGrade(color, uContrast, uSaturation, uExposure, uGamma);
      
      // 7. Film halation
      color += halation(color, 0.7);
      
      // 8. Cinematic vignette
      float vignette = cinematicVignette(vUv, uVignetteDarkness, uVignetteOffset);
      color *= vignette;
      
      // 9. Film grain (temporal)
      float grain = filmGrain(vUv, uTime);
      grain = (grain - 0.5) * uGrainIntensity;
      color += grain;
      
      // 10. Final clamp and output
      color = clamp(color, 0.0, 1.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};
