"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);

  return (
    <footer ref={container} className="w-full bg-[#D6E6F2] text-[#1A1A1A] pt-32 pb-12 px-6 md:px-12 flex flex-col justify-between min-h-screen">

      {/* Top Split: Massive Brutalist Typography & Logo */}
      <div className="flex-grow flex flex-col justify-center mt-12 md:mt-0 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <div>
            <div className="footer-reveal font-serif text-[11.5vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase mb-2 md:mb-4">
              <span>Woven</span>
            </div>
            <div className="footer-reveal font-serif text-[11.5vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase mb-2 md:mb-4 flex flex-wrap items-center">
              {/* Inline Video Element */}
              <div className="relative w-[25vw] md:w-[18vw] h-[10vw] md:h-[8vw] overflow-hidden inline-block align-middle mr-2 md:mr-6 shrink-0 bg-[#1A1A1A]/10">
                <video
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="https://www.pexels.com/download/video/34800248/"
                />
              </div>
              <span>With</span>
            </div>
            <div className="footer-reveal font-serif text-[11.5vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase text-[#8A9A86]">
              Purpose.
            </div>
          </div>

          {/* Logo element on the right where the box was drawn */}
          <div className="footer-reveal hidden md:block font-serif text-5xl tracking-widest uppercase pb-4 text-[#1A1A1A]">
            Orello
          </div>
        </div>
      </div>

      {/* Bottom Split: Links & Utility */}
      <div className="footer-reveal border-t border-[#1A1A1A]/20 pt-12 mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-0">

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-6 font-sans text-sm uppercase tracking-widest text-[#1A1A1A]/70">
          <Link href="/shop" className="hover:text-[#1A1A1A] transition-colors">Shop Catalog</Link>
          <Link href="/story" className="hover:text-[#1A1A1A] transition-colors">Our Story</Link>
          <Link href="/bespoke" className="hover:text-[#1A1A1A] transition-colors">Bespoke</Link>
          <Link href="/contact" className="hover:text-[#1A1A1A] transition-colors">Contact</Link>
          <Link href="/faq" className="hover:text-[#1A1A1A] transition-colors">FAQ / Care</Link>
          <Link href="/returns" className="hover:text-[#1A1A1A] transition-colors">Returns</Link>
        </div>

        {/* Newsletter & Copyright */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <p className="font-sans text-xs uppercase tracking-[0.1em] text-[#1A1A1A]/50 mb-6">Join the Atelier</p>
          <div className="flex w-full md:w-96 border-b border-[#1A1A1A]/30 pb-3 mb-16">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-none outline-none text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 font-sans w-full"
            />
            <button className="font-sans text-xs uppercase tracking-widest hover:text-[#8A9A86] transition-colors shrink-0 ml-4">
              Submit
            </button>
          </div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
            © {new Date().getFullYear()} Orello Luxury. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
