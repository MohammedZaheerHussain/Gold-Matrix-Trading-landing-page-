import { PricingSection } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";

export const metadata = {
    title: "Pricing | Gold Matrix",
    description: "Simple, transparent pricing for Gold Matrix trading platform.",
};

export default function PricingPage() {
    return (
        <main className="pt-20">
            <PricingSection />
            <Footer />
        </main>
    );
}
