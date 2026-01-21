import { Footer } from "@/components/sections/footer";
import { Apple, Smartphone } from "lucide-react";

export const metadata = {
    title: "Download | Gold Matrix",
    description: "Download Gold Matrix trading app for iOS and Android.",
};

export default function DownloadPage() {
    return (
        <main className="pt-20 min-h-screen bg-black">
            <section className="py-32">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    {/* Header */}
                    <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                        Get the App
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                        Download{" "}
                        <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                            Gold Matrix
                        </span>
                    </h1>
                    <p className="text-lg text-foreground/50 max-w-xl mx-auto mb-16">
                        Trade on the go with our powerful mobile app. Available for iOS and Android.
                    </p>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <a
                            href="#"
                            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl hover:bg-white/90 transition-colors min-w-[220px]"
                        >
                            <Apple className="w-8 h-8" />
                            <div className="text-left">
                                <div className="text-xs text-black/60">Download on the</div>
                                <div className="text-lg font-semibold">App Store</div>
                            </div>
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl hover:bg-white/90 transition-colors min-w-[220px]"
                        >
                            <Smartphone className="w-8 h-8" />
                            <div className="text-left">
                                <div className="text-xs text-black/60">Get it on</div>
                                <div className="text-lg font-semibold">Google Play</div>
                            </div>
                        </a>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                            <div className="text-2xl mb-3">⚡</div>
                            <h3 className="text-lg font-medium mb-2">Lightning Fast</h3>
                            <p className="text-foreground/50 text-sm">
                                Execute trades in milliseconds with our optimized mobile infrastructure.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                            <div className="text-2xl mb-3">🔒</div>
                            <h3 className="text-lg font-medium mb-2">Secure</h3>
                            <p className="text-foreground/50 text-sm">
                                Biometric authentication and bank-grade encryption keep your funds safe.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                            <div className="text-2xl mb-3">📊</div>
                            <h3 className="text-lg font-medium mb-2">Full Featured</h3>
                            <p className="text-foreground/50 text-sm">
                                All the charting and analysis tools you need, right in your pocket.
                            </p>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="mt-20 pt-16 border-t border-white/[0.05]">
                        <p className="text-foreground/50 mb-6">Scan to download</p>
                        <div className="w-40 h-40 mx-auto bg-white rounded-2xl p-4 flex items-center justify-center">
                            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center">
                                <span className="text-4xl font-sentient bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                    QR
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
