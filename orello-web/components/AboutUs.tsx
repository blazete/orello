"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left side text stagger fade-up on scroll
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Right side looping video parallax depth using scrub: true
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: 150, // The parallax distance drifting downwards
      ease: "none",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-[#EBE4D6] py-32 md:py-48 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center overflow-hidden">
      
      {/* Left Column: Text Content */}
      <div ref={textRef} className="max-w-xl mx-auto md:mx-0 z-10 pl-0 md:pl-12">
        <h2 className="about-text font-serif text-5xl md:text-7xl text-[#1A1A1A] leading-tight mb-8">
          Woven from the hands of masters.
        </h2>
        <p className="about-text font-sans text-[#757575] text-lg md:text-xl leading-relaxed mb-6">
          Every Orello piece is a testament to centuries of tradition. We source only the finest raw materials—from high-altitude wool to delicate silks—and entrust them to artisans who have perfected their craft over generations.
        </p>
        <p className="about-text font-sans text-[#757575] text-lg md:text-xl leading-relaxed mb-10">
          The result is more than a rug. It is a living artifact that grounds your modern space with heritage, texture, and an undeniable soul.
        </p>
        <div className="about-text">
          <button className="font-sans uppercase tracking-[0.1em] text-sm text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#8A9A86] hover:border-[#8A9A86] transition-colors">
            Discover Our Story
          </button>
        </div>
      </div>

      {/* Right Column: Parallax Video */}
      <div className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center">
        {/* We place the video inside an oversized container and translate it on scroll */}
        <div ref={videoRef} className="absolute top-[-100px] w-[100%] md:w-[85%] h-[calc(100%+200px)]">
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            src="https://www.pexels.com/download/video/37187990/"
          />
        </div>
      </div>
      
    </section>
  );
}
