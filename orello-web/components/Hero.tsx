"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // GSAP Timeline for Entrance
    const tl = gsap.timeline();

    // The Split-Screen videos scale down from 1.1 to 1
    tl.fromTo(
      ".hero-media",
      { scale: 1.1 },
      { scale: 1, duration: 2.5, ease: "power3.out" }
    );

    // The Typography fades in and drifts up (Antigravity Entrance Rule)
    tl.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.15 },
      "-=2" // Start this slightly before the video scaling finishes
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden"
    >
      {/* Left Column: Macro Video */}
      <div className="relative w-full h-full overflow-hidden">
        <video
          className="hero-media absolute inset-0 w-full h-full object-cover origin-center"
          autoPlay
          muted
          loop
          playsInline
          // Left column Pexels video
          src="https://www.pexels.com/download/video/10651087/"
        />
        {/* Subtle Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-[#1A1A1A]/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-[#F9F8F6] z-10">
          <p className="hero-text font-sans text-sm tracking-[0.05em] uppercase mb-4">
            Macro Detail
          </p>
          <h1 className="hero-text font-serif text-6xl md:text-8xl tracking-tight leading-none">
            Heritage
          </h1>
        </div>
      </div>

      {/* Right Column: Lifestyle Video */}
      <div className="relative w-full h-full overflow-hidden hidden md:block">
        <Image
          className="hero-media absolute inset-0 w-full h-full object-cover origin-center"
          alt="Lifestyle Modern Interior"
          src="https://images.pexels.com/photos/8092165/pexels-photo-8092165.jpeg"
          fill
        />
        {/* Subtle Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-[#1A1A1A]/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-[#F9F8F6] z-10">
          <p className="hero-text font-sans text-sm tracking-[0.05em] uppercase mb-4">
            Lifestyle
          </p>
          <h1 className="hero-text font-serif text-6xl md:text-8xl tracking-tight leading-none">
            Modern
          </h1>
        </div>
      </div>

      {/* Central "Explore Now" Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 hidden md:flex">
        <Link
          href="/shop"
          className="hero-text pointer-events-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-[#F9F8F6] font-sans text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 rounded-sm"
        >
          Explore Now
        </Link>
      </div>
    </section>
  );
}
