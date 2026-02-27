import Footer from "@/components/layout/Footer";
import { FeaturedSection } from "@/components/modules/Home/FeaturedSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import { Testimonials } from "@/components/modules/Home/Testimonials";
import { WorkFlow } from "@/components/modules/Home/WorkFlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <WorkFlow />
      <FeaturedSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
