import { AboutSection } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";

export const metadata = {
    title: "About | Gold Matrix",
    description: "Learn about Gold Matrix - empowering traders to succeed with cutting-edge technology.",
};

export default function AboutPage() {
    return (
        <main className="pt-20">
            <AboutSection />
            <Footer />
        </main>
    );
}
