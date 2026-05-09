"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const bestSellers = [
  { id: 1, name: "The Nomad", category: "Wool", price: "₹4,200", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80", height: "aspect-[3/4]" },
  { id: 2, name: "Desert Sand", category: "Silk", price: "₹6,500", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80", height: "aspect-[4/5]" },
  { id: 3, name: "Midnight Indigo", category: "Cotton", price: "₹2,800", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80", height: "aspect-square" },
  { id: 4, name: "Atlas Mountain", category: "Wool", price: "₹5,100", image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80", height: "aspect-[3/4]" },
];

export default function BestSellers() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".bestseller-card", {
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
    <section ref={container} className="w-full bg-[#F9F8F6] py-24 md:py-32 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-[#1A1A1A]/10 pb-8">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] mb-4">Best Sellers</h2>
          <p className="font-sans text-sm tracking-widest uppercase text-[#757575]">Signature Pieces</p>
        </div>
        <Link href="/shop" className="mt-8 md:mt-0 font-sans text-xs uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#8A9A86] hover:border-[#8A9A86] transition-colors">
          Shop The Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {bestSellers.map(product => (
          <Link 
            href={`/shop/${product.id}`} 
            key={product.id} 
            className="bestseller-card group block cursor-pointer"
          >
            <div className={`relative w-full overflow-hidden bg-[#EBEBEB] ${product.height}`}>
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors">{product.name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#757575] mt-2">{product.category}</p>
              </div>
              <div className="font-sans text-sm tracking-widest opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0">
                {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
