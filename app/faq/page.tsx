import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export const metadata = {
    title: "FAQ | Gold Matrix",
    description: "Frequently asked questions about Gold Matrix trading platform.",
};

export default function FAQPage() {
    return (
        <main className="pt-20">
            <FAQSection />
            <Footer />
        </main>
    );
}
