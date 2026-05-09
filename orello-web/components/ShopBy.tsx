"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const shopByData = [
  { title: "Shop by Room", subtitle: "Living Spaces", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80", colSpan: "col-span-1 md:col-span-2" },
  { title: "Shop by Material", subtitle: "Raw Silk", image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80", colSpan: "col-span-1" },
  { title: "Shop by Style", subtitle: "Minimalist", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80", colSpan: "col-span-1" },
];

export default function ShopBy() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".shop-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#1A1A1A] py-24 md:py-32 px-6 md:px-12 text-[#F9F8F6]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8 md:mb-0">Curated<br/>Collections</h2>
        <Link href="/shop" className="font-sans text-xs uppercase tracking-widest border-b border-[#F9F8F6] pb-1 hover:text-[#8A9A86] hover:border-[#8A9A86] transition-colors">
          View All Spaces
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[120vh] md:h-[80vh]">
        
        {/* Large Card: Shop by Room */}
        <Link href="/shop" className="shop-card group relative w-full h-full overflow-hidden block md:row-span-2">
          <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
            <Image src={shopByData[0].image} alt="Shop by Room" fill className="object-cover opacity-70" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8">
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#F9F8F6]/70 mb-2">{shopByData[0].subtitle}</p>
            <h3 className="font-serif text-3xl md:text-4xl">{shopByData[0].title}</h3>
          </div>
        </Link>

        {/* Small Card Top: Shop by Material */}
        <Link href="/shop" className="shop-card group relative w-full h-full overflow-hidden block">
          <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
            <Image src={shopByData[1].image} alt="Shop by Material" fill className="object-cover opacity-70" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8">
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#F9F8F6]/70 mb-2">{shopByData[1].subtitle}</p>
            <h3 className="font-serif text-3xl md:text-4xl">{shopByData[1].title}</h3>
          </div>
        </Link>

        {/* Small Card Bottom: Shop by Style */}
        <Link href="/shop" className="shop-card group relative w-full h-full overflow-hidden block">
          <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
            <Image src={shopByData[2].image} alt="Shop by Style" fill className="object-cover opacity-70" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8">
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#F9F8F6]/70 mb-2">{shopByData[2].subtitle}</p>
            <h3 className="font-serif text-3xl md:text-4xl">{shopByData[2].title}</h3>
          </div>
        </Link>
        
      </div>
    </section>
  );
}
