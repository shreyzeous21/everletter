import ContentSection from "@/components/home/ContentSection";
import Features from "@/components/home/Features";
import HeroSection from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <HeroSection />
      <ContentSection />
      <Features />
    </div>
  );
}
