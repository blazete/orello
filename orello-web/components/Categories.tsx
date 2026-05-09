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

const categories = [
  { name: "Table Runners", image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80" },
  { name: "Cushion Covers", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80" },
  { name: "Throw Blankets", image: "https://images.unsplash.com/photo-1580828326068-1e4277732a39?auto=format&fit=crop&q=80" },
  { name: "Poufs", image: "https://images.unsplash.com/photo-1581428982868-e410dd447b57?auto=format&fit=crop&q=80" },
  { name: "Placemats", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80" },
  { name: "Wall Hangings", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80" },
  { name: "Combos", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80" }
];

export default function Categories() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".category-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#F9F8F6] pt-12 pb-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12">Our categories</h2>
      
      {/* Horizontal Scrollable Container */}
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:-mx-12 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-6 snap-x snap-mandatory">
        {categories.map((category, i) => (
          <Link 
            href={`/shop`} 
            key={i} 
            className="category-card group relative flex-none w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] aspect-square bg-[#EBEBEB] overflow-hidden snap-start block"
          >
            {/* The Image/Illustration Overlay */}
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover mix-blend-multiply opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Overlay Title matching screenshot style (bottom left, small white text) */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="font-sans text-xs md:text-sm text-[#F9F8F6] tracking-widest uppercase drop-shadow-md">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
