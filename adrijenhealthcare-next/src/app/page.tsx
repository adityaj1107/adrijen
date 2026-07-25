import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSplit } from "@/components/home/AboutSplit";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BlogPreview } from "@/components/home/BlogPreview";
import { InquirySection } from "@/components/home/InquirySection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustBadges />
      <AboutSplit />
      <CategoryGrid />
      <WhyChooseUs />
      <BlogPreview />
      <InquirySection />
    </>
  );
}
