"use client";

import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { toggleNav, toggleCart, isNavOpen, isCartOpen } = useUIStore();
  const cartCount = useCartStore(state => state.cartCount());
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Determine text color based on scroll, pathname, and drawer states
  const isSolidHeader = !isHomePage || scrolled;
  const baseTextColor = isSolidHeader && !isNavOpen && !isCartOpen ? "text-[#1A1A1A]" : "text-white";

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[50] transition-colors duration-500 ${
        isSolidHeader && !isNavOpen && !isCartOpen ? "bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#1A1A1A]/10" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        
        {/* Menu Toggle */}
        <button 
          onClick={toggleNav}
          className={`font-sans text-sm uppercase tracking-[0.05em] transition-colors duration-300 hover:opacity-70 ${
            isNavOpen ? "text-[#1A1A1A]" : baseTextColor
          }`}
        >
          {isNavOpen ? 'Close' : 'Menu'}
        </button>

        {/* Logo */}
        <Link 
          href="/" 
          className={`font-serif text-2xl md:text-3xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${
            baseTextColor
          }`}
        >
          Orello
        </Link>

        {/* Cart Toggle */}
        <button 
          onClick={toggleCart}
          className={`font-sans text-sm uppercase tracking-[0.05em] transition-colors duration-300 hover:opacity-70 ${
            baseTextColor
          }`}
        >
          Bag ({cartCount})
        </button>
        
      </div>
    </header>
  );
}
