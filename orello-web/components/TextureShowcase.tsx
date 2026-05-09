"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function TextureShowcase() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Background Typography parallax (moves down slowly while you scroll up)
    gsap.to(".bg-typography", {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: 100,
      ease: "none",
    });

    // 2. Foreground Image 1 parallax (moves up moderately fast)
    gsap.to(".fg-image-1", {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      yPercent: -30,
      ease: "none",
    });

    // 3. Foreground Image 2 parallax (moves up extremely fast, creating the zero-gravity overlap)
    gsap.to(".fg-image-2", {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      yPercent: -60,
      ease: "none",
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[120vh] bg-[#F9F8F6] overflow-hidden flex items-center justify-center py-20">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <h2 className="bg-typography font-serif text-[18vw] md:text-[22vw] leading-none text-[#1A1A1A]/5 whitespace-nowrap tracking-tighter">
          RAW TEXTURE
        </h2>
      </div>

      {/* Foreground Image Grid */}
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Image */}
        <div className="md:col-span-5 md:col-start-2 mt-20 md:mt-40">
          <div className="fg-image-1">
            <div className="relative w-full aspect-[4/5] overflow-hidden mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80"
                alt="Rug Texture Detail"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans text-xs uppercase tracking-widest text-[#757575]">01 / Material</p>
            <p className="font-serif text-3xl text-[#1A1A1A] mt-2">High-Altitude Wool</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:col-span-4 md:col-start-8 mt-32 md:mt-0">
          <div className="fg-image-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80"
                alt="Artisan Weaving"
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans text-xs uppercase tracking-widest text-[#757575]">02 / Craft</p>
            <p className="font-serif text-3xl text-[#1A1A1A] mt-2">Hand-Knotted Density</p>
          </div>
        </div>

      </div>
    </section>
  );
}
