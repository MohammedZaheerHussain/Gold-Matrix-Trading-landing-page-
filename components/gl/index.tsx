import { Effects } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import { Particles } from "./particles";
import { CinematicShader } from "./shaders/cinematicShader";

// Component to update time uniform for cinematic effects
function CinematicEffects({
  grainIntensity,
  chromaticAberration,
  bloomIntensity,
  bloomThreshold,
  contrast,
  saturation,
  exposure,
  vignetteDarkness,
  vignetteOffset,
}: {
  grainIntensity: number;
  chromaticAberration: number;
  bloomIntensity: number;
  bloomThreshold: number;
  contrast: number;
  saturation: number;
  exposure: number;
  vignetteDarkness: number;
  vignetteOffset: number;
}) {
  const { size } = useThree();
  const shaderRef = useRef<typeof CinematicShader>(null);

  useEffect(() => {
    if (shaderRef.current) {
      (shaderRef.current as any).uniforms.uResolution.value = [size.width, size.height];
    }
  }, [size]);

  useFrame((state) => {
    if (shaderRef.current) {
      (shaderRef.current as any).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <Effects multisamping={0} disableGamma>
      {/* @ts-ignore */}
      <shaderPass
        ref={shaderRef}
        args={[CinematicShader]}
        uniforms-uGrainIntensity-value={grainIntensity}
        uniforms-uChromaticAberration-value={chromaticAberration}
        uniforms-uBloomIntensity-value={bloomIntensity}
        uniforms-uBloomThreshold-value={bloomThreshold}
        uniforms-uContrast-value={contrast}
        uniforms-uSaturation-value={saturation}
        uniforms-uExposure-value={exposure}
        uniforms-uVignetteDarkness-value={vignetteDarkness}
        uniforms-uVignetteOffset-value={vignetteOffset}
      />
    </Effects>
  );
}

export const GL = ({ hovering }: { hovering: boolean }) => {
  const {
    speed,
    focus,
    aperture,
    size,
    noiseScale,
    noiseIntensity,
    timeScale,
    pointSize,
    opacity,
    planeScale,
    useManualTime,
    manualTime,
  } = useControls("Particle System", {
    speed: { value: 1.0, min: 0, max: 2, step: 0.01 },
    noiseScale: { value: 0.6, min: 0.1, max: 5, step: 0.1 },
    noiseIntensity: { value: 0.52, min: 0, max: 2, step: 0.01 },
    timeScale: { value: 1, min: 0, max: 2, step: 0.01 },
    focus: { value: 3.8, min: 0.1, max: 20, step: 0.1 },
    aperture: { value: 1.79, min: 0, max: 2, step: 0.01 },
    pointSize: { value: 10.0, min: 0.1, max: 10, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    planeScale: { value: 10.0, min: 0.1, max: 10, step: 0.1 },
    size: {
      value: 512,
      options: [256, 512, 1024],
    },
    useManualTime: { value: false },
    manualTime: { value: 0, min: 0, max: 50, step: 0.01 },
  });

  const {
    grainIntensity,
    chromaticAberration,
    bloomIntensity,
    bloomThreshold,
    contrast,
    saturation,
    exposure,
    vignetteDarkness,
    vignetteOffset,
  } = useControls("Cinematic Effects", {
    grainIntensity: { value: 0.035, min: 0, max: 0.15, step: 0.005 },
    chromaticAberration: { value: 0.0012, min: 0, max: 0.005, step: 0.0002 },
    bloomIntensity: { value: 0.16, min: 0, max: 0.5, step: 0.02 },
    bloomThreshold: { value: 0.55, min: 0, max: 1, step: 0.05 },
    contrast: { value: 1.06, min: 0.8, max: 1.3, step: 0.01 },
    saturation: { value: 1.1, min: 0.5, max: 1.5, step: 0.02 },
    exposure: { value: 1.0, min: 0.7, max: 1.3, step: 0.02 },
    vignetteDarkness: { value: 0.7, min: 0, max: 1.5, step: 0.05 },
    vignetteOffset: { value: 0.45, min: 0, max: 1, step: 0.05 },
  });

  return (
    <div id="webgl">
      <Canvas
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        <color attach="background" args={["#000"]} />
        <Particles
          speed={speed}
          aperture={aperture}
          focus={focus}
          size={size}
          noiseScale={noiseScale}
          noiseIntensity={noiseIntensity}
          timeScale={timeScale}
          pointSize={pointSize}
          opacity={opacity}
          planeScale={planeScale}
          useManualTime={useManualTime}
          manualTime={manualTime}
          introspect={hovering}
        />
        <CinematicEffects
          grainIntensity={grainIntensity}
          chromaticAberration={chromaticAberration}
          bloomIntensity={bloomIntensity}
          bloomThreshold={bloomThreshold}
          contrast={contrast}
          saturation={saturation}
          exposure={exposure}
          vignetteDarkness={vignetteDarkness}
          vignetteOffset={vignetteOffset}
        />
      </Canvas>
    </div>
  );
};
