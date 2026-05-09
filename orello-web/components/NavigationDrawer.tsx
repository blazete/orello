"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";

const navLinks = [
  { label: "Shop Catalog", href: "/shop" },
  { label: "Our Heritage", href: "/story" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Bespoke Service", href: "/bespoke" },
];

export default function NavigationDrawer() {
  const { isNavOpen, closeAll } = useUIStore();
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    // Initial states
    gsap.set(".drawer-overlay", { opacity: 0, display: "none" });
    gsap.set(".drawer-content", { xPercent: -100, visibility: "visible" });
    gsap.set(".nav-link-item", { y: 30, opacity: 0 });
    gsap.set(".nav-footer-item", { y: 20, opacity: 0 });

    // Setup timeline
    tl.current = gsap.timeline({ paused: true })
      // Fade in background overlay
      .to(".drawer-overlay", { opacity: 1, display: "block", duration: 0.4, ease: "power2.out" })
      // Slide in the drawer from left
      .to(".drawer-content", { xPercent: 0, duration: 0.8, ease: "power3.out" }, "<")
      // Stagger fade-in the links (Antigravity Entrance Rule)
      .to(".nav-link-item", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
      // Fade in the footer links
      .to(".nav-footer-item", { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  useEffect(() => {
    if (isNavOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isNavOpen]);

  return (
    <div ref={container} className="fixed inset-0 z-[40] pointer-events-none">
      {/* Dark Overlay */}
      <div 
        className="drawer-overlay absolute inset-0 bg-black/60 pointer-events-auto backdrop-blur-sm"
        style={{ opacity: 0, display: 'none' }}
        onClick={closeAll}
      />
      
      {/* Left Drawer Content */}
      <div 
        className="drawer-content absolute top-0 left-0 h-screen w-full sm:w-[500px] bg-[#F9F8F6] pointer-events-auto flex flex-col justify-center px-12 md:px-20"
        style={{ visibility: 'hidden' }}
      >
        
        <nav className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <Link 
                href={link.href}
                className="nav-link-item block text-4xl md:text-5xl font-serif text-[#1A1A1A] hover:text-[#8A9A86] transition-colors"
                onClick={closeAll}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="mt-20 flex flex-col gap-6">
          <div className="overflow-hidden">
            <p className="nav-footer-item text-xs font-sans uppercase tracking-[0.1em] text-[#757575] mb-2">Follow Orello</p>
            <div className="flex gap-6">
              <a href="#" className="nav-footer-item text-sm font-sans uppercase tracking-widest text-[#1A1A1A] hover:text-[#8A9A86] transition-colors">Instagram</a>
              <a href="#" className="nav-footer-item text-sm font-sans uppercase tracking-widest text-[#1A1A1A] hover:text-[#8A9A86] transition-colors">Pinterest</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
