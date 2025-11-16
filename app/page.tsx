"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/layout/Header").then(mod => ({ default: mod.Header })), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/homepage/Hero").then(mod => ({ default: mod.Hero })), {
  ssr: false,
});

const Features = dynamic(() => import("@/components/homepage/Features").then(mod => ({ default: mod.Features })), {
  ssr: false,
});

const Pricing = dynamic(() => import("@/components/homepage/Pricing").then(mod => ({ default: mod.Pricing })), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => ({ default: mod.Footer })), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
