"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/homepage/Header"), { ssr: false });
const Hero = dynamic(() => import("@/components/homepage/HeroSection"), { ssr: false });
const Features = dynamic(() => import("@/components/homepage/FeaturesGrid"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/homepage/HowItWorks"), { ssr: false });
const PricingCTA = dynamic(() => import("@/components/homepage/PricingCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/homepage/Footer"), { ssr: false });

export default function Page() {
  return (
    <main className="font-cakelan bg-white text-slate-900">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <PricingCTA />
      <Footer />
    </main>
  );
}

