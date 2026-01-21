import { FeaturesSection } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";

export const metadata = {
    title: "Trading | Gold Matrix",
    description: "Explore Gold Matrix trading features - lightning fast execution, advanced analytics, and more.",
};

export default function TradingPage() {
    return (
        <main className="pt-20">
            <FeaturesSection />
            <Footer />
        </main>
    );
}
