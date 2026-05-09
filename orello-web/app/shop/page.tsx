"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { flushSync } from "react-dom";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const categories = ["All", "Wool", "Silk", "Cotton"];

const products = [
  { id: 1, name: "The Nomad", category: "Wool", price: "₹4,200", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80", height: "aspect-[3/4]" },
  { id: 2, name: "Desert Sand", category: "Silk", price: "₹6,500", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80", height: "aspect-[4/5]" },
  { id: 3, name: "Midnight Indigo", category: "Cotton", price: "₹2,800", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80", height: "aspect-square" },
  { id: 4, name: "Atlas Mountain", category: "Wool", price: "₹5,100", image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80", height: "aspect-square" },
  { id: 5, name: "Crimson Heritage", category: "Wool", price: "₹4,900", image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80", height: "aspect-[3/4]" },
  { id: 6, name: "Ivory Lattice", category: "Silk", price: "₹8,200", image: "https://images.unsplash.com/photo-1581428982868-e410dd447b57?auto=format&fit=crop&q=80", height: "aspect-[4/5]" },
];

export default function ShopPage() {
  const [filter, setFilter] = useState("All");

  const handleFilter = (newFilter: string) => {
    if (newFilter === filter) return;
    
    // 1. Capture the current state of all product cards
    const state = Flip.getState(".product-card");
    
    // 2. Synchronously update the DOM layout by changing state
    flushSync(() => {
      setFilter(newFilter);
    });
    
    // 3. GSAP animates from the captured layout to the new layout
    Flip.from(state, {
      duration: 0.8,
      ease: "power3.out",
      absolute: true,
      stagger: 0.05,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
    });
  };

  return (
    <main className="w-full min-h-screen bg-[#F9F8F6] pt-40 pb-24 px-6 md:px-12">
      
      {/* PLP Header */}
      <div className="mb-16 border-b border-[#1A1A1A]/10 pb-8">
        <h1 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] mb-4">Catalog</h1>
        <p className="font-sans text-sm tracking-widest uppercase text-[#757575]">Hand-Knotted Collection</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sticky Left Sidebar Filters */}
        <div className="w-full md:w-1/4 lg:w-1/5 relative">
          <div className="sticky top-32 flex flex-col gap-4 font-sans text-xs uppercase tracking-widest">
            <h2 className="font-bold text-sm mb-4 border-b border-[#1A1A1A]/10 pb-2">Filter By Material</h2>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => handleFilter(c)}
                className={`text-left transition-colors ${filter === c ? 'text-[#1A1A1A] font-bold' : 'text-[#757575] hover:text-[#1A1A1A]'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Masonry Style via Mixed Aspect Ratios */}
        <div className="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative min-h-[50vh]">
          {products.map(product => {
            // Instead of removing elements from the array, we hide them. 
            // This allows GSAP Flip to animate their exit correctly.
            const isVisible = filter === "All" || product.category === filter;
            
            return (
              <Link 
                href={`/shop/${product.id}`} 
                key={product.id} 
                className={`product-card group block cursor-pointer ${isVisible ? '' : 'hidden'}`} 
                data-flip-id={product.id}
              >
                {/* Image Container with Hover Scale */}
                <div className={`relative w-full overflow-hidden bg-[#EBEBEB] ${product.height}`}>
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                  />
                </div>
                
                {/* Meta Data */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors">{product.name}</h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#757575] mt-2">{product.category}</p>
                  </div>
                  
                  {/* Price reveals softly on hover */}
                  <div className="font-sans text-sm tracking-widest opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0">
                    {product.price}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </main>
  );
}
