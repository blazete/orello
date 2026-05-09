"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const productImages = [
  "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80&w=2000"
];

const variants = [
  "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=100",
];

const sizes = ["3 ft. x 5 ft.", "4 ft. x 6 ft.", "5 ft. x 7 ft.", "8 ft. x 10 ft."];
const badges = ["Anti-skid", "Made With Premium Chenille", "Extra Soft", "Highly Durable", "Machine Washable"];

const accordions = [
  { title: "Description", content: "Woven in the high atlas mountains, this piece represents over 400 hours of continuous knotting by master artisans. Its dense wool pile absorbs light and sound, grounding your space with a raw, tactile warmth." },
  { title: "Product Information", content: "Pile Height: 0.5 inches. Material: 100% Raw Wool. Construction: Hand-Knotted. Origin: Atlas Mountains." },
  { title: "Care Instructions", content: "Vacuum regularly without a beater bar. Spot clean immediately with a damp cloth. Professional cleaning recommended every 1-2 years." },
  { title: "Shipping & Returns", content: "Complimentary global shipping on all orders. Returns accepted within 30 days of delivery." }
];

const boughtTogether = [
  { id: "rhap", name: "Rhapsody of Songbirds Runner", price: "₹2,295", originalPrice: "₹4,590", image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?auto=format&fit=crop&q=80&w=200" },
  { id: "leher", name: "Leher Ancestral Round Rug", price: "₹2,995", originalPrice: "₹5,990", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=200" }
];

export default function ProductDetailPage() {
  const { toggleCart, isCartOpen } = useUIStore();
  const addToCart = useCartStore(state => state.addToCart);
  
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Magnifier Antigravity Cursor State
  const [magnifier, setMagnifier] = useState({ x: 0, y: 0, show: false, imgX: 0, imgY: 0, src: "" });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, src: string) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const imgX = (x / width) * 100;
    const imgY = (y / height) * 100;

    setMagnifier({ x: e.clientX, y: e.clientY, show: true, imgX, imgY, src });
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add to global state
    addToCart({
      id: "nomad-1", // hardcoded for demo
      name: "The Nomad",
      price: 2990,
      quantity: quantity,
      size: selectedSize,
      image: productImages[0]
    });

    // 1. Create a clone DOM element to fly across the screen
    const clone = document.createElement("div");
    const rect = e.currentTarget.getBoundingClientRect();
    
    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = "40px";
    clone.style.height = "40px";
    clone.style.backgroundImage = `url(${productImages[0]})`;
    clone.style.backgroundSize = "cover";
    clone.style.backgroundPosition = "center";
    clone.style.borderRadius = "50%";
    clone.style.zIndex = "9999";
    clone.style.pointerEvents = "none";
    
    document.body.appendChild(clone);
    
    // 2. Animate it along a bezier curve to the top right cart icon
    gsap.to(clone, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: (window.innerWidth / 2) - rect.left + 100, y: -200 }, // Arc Apex point
          { x: window.innerWidth - rect.left - 60, y: -rect.top + 40 } // Cart Icon target
        ],
        curviness: 1.5
      },
      scale: 0.5,
      opacity: 0.8,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        // Clean up and trigger the drawer state
        clone.remove();
        if (!isCartOpen) {
          toggleCart();
        }
      }
    });
  };

  return (
    <main className="w-full min-h-screen bg-white">
      
      {/* React Portal: Magnifier Cursor (hidden on mobile) */}
      {magnifier.show && (
        <div 
          className="hidden md:block fixed pointer-events-none rounded-full border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.3)] z-[100] overflow-hidden transition-opacity duration-200"
          style={{
            left: magnifier.x - 125,
            top: magnifier.y - 125,
            width: 250,
            height: 250,
            backgroundImage: `url(${magnifier.src})`,
            backgroundPosition: `${magnifier.imgX}% ${magnifier.imgY}%`,
            backgroundSize: "300%",
          }}
        />
      )}

      <div className="flex flex-col lg:flex-row w-full pt-24 px-4 md:px-12 max-w-[1600px] mx-auto gap-12">
        
        {/* Left Side: Media Gallery (Vertically Scrolling) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {productImages.map((src, idx) => (
            <div 
              key={`img-${idx}`}
              className={`relative w-full ${idx === 0 ? 'aspect-[4/5]' : 'aspect-square'} bg-[#EBEBEB] overflow-hidden md:cursor-none`}
              onMouseMove={(e) => handleMouseMove(e, src)}
              onMouseLeave={() => setMagnifier(prev => ({ ...prev, show: false }))}
            >
              <Image src={src} alt={`Product view ${idx + 1}`} fill priority={idx === 0} className="object-cover" />
            </div>
          ))}
        </div>

        {/* Right Side: Buy Box (Sticky) */}
        <div className="w-full lg:w-2/5 relative">
          <div className="flex flex-col sticky top-24 pb-24">
            
            <h1 className="font-sans text-3xl text-[#1A1A1A] mb-1">The Nomad Area Rug</h1>
            <p className="font-sans text-sm text-[#757575] mb-2">Dimensions: 3 ft. x 5 ft.</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#DEB065] text-sm">★★★★★</span>
              <span className="font-sans text-xs text-[#757575]">4.8 (13)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#DEB065] text-white px-2 py-0.5 font-sans text-xs font-bold rounded-sm">Save 50%</span>
              <span className="font-sans text-sm text-[#757575] line-through">₹5,980.00</span>
              <span className="font-sans text-lg font-bold text-[#1A1A1A]">₹2,990.00</span>
            </div>

            <p className="font-sans text-sm text-[#757575] mb-2">Variant: <span className="text-[#1A1A1A]">The Nomad Area Rug</span></p>
            
            {/* Variant Thumbnails */}
            <div className="flex flex-wrap gap-2 mb-8">
              {variants.map((v, i) => (
                <div 
                  key={`var-${i}`} 
                  onClick={() => setSelectedVariant(i)}
                  className={`relative w-12 h-16 cursor-pointer rounded-sm overflow-hidden border-2 transition-colors ${
                    selectedVariant === i ? 'border-[#B0714E]' : 'border-transparent'
                  }`}
                >
                  <Image src={v} alt="Variant" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map(badge => (
                <span key={badge} className="bg-[#fcf5e3] text-[#b38e4a] px-3 py-1.5 rounded-full font-sans text-xs">
                  {badge}
                </span>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-sans text-sm font-semibold text-[#1A1A1A] mb-2">Quantity:</p>
              <div className="flex items-center border border-[#1A1A1A]/20 w-max rounded-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-[#757575] hover:text-[#1A1A1A] transition-colors">-</button>
                <span className="font-sans text-sm w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-[#757575] hover:text-[#1A1A1A] transition-colors">+</button>
              </div>
            </div>
            
            {/* Size Selector */}
            <div className="mb-8">
              <p className="font-sans text-sm font-semibold text-[#1A1A1A] mb-2">Size: {selectedSize}</p>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 font-sans text-xs border rounded-sm transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-[#1A1A1A] text-[#1A1A1A] font-semibold' 
                        : 'border-[#EBEBEB] text-[#757575] hover:border-[#1A1A1A]/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Bag / Buy It Now Triggers */}
            <div className="flex flex-col gap-3 mb-10">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#DEB065] text-white py-4 font-sans font-semibold text-sm hover:opacity-90 transition-opacity rounded-sm shadow-sm"
              >
                Add to cart
              </button>
              <Link
                href="/cart"
                onClick={() => {
                  addToCart({
                    id: "nomad-1", name: "The Nomad", price: 2990, quantity: quantity, size: selectedSize, image: productImages[0]
                  });
                }}
                className="w-full bg-[#B0714E] text-white py-4 font-sans font-semibold text-sm hover:opacity-90 transition-opacity rounded-sm shadow-sm text-center block"
              >
                Buy it now
              </Link>
            </div>
            
            {/* Accordions */}
            <div className="border-t border-[#1A1A1A]/10 mb-10">
              {accordions.map((acc, i) => (
                <div key={i} className="border-b border-[#1A1A1A]/10">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full py-4 flex justify-between items-center font-sans font-semibold text-sm text-[#1A1A1A]"
                  >
                    {acc.title}
                    <span className="text-[#1A1A1A]/40 bg-[#F9F8F6] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {openAccordion === i ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordion === i && (
                    <div className="pb-4 font-sans text-sm text-[#757575] leading-relaxed">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Frequently Bought Together */}
            <div>
              <h3 className="font-sans font-semibold text-sm text-[#1A1A1A] mb-4">Frequently bought together</h3>
              <div className="flex flex-col gap-4">
                {boughtTogether.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border border-[#1A1A1A]/10 p-3 rounded-sm">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-sm overflow-hidden bg-[#EBEBEB]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans font-semibold text-xs text-[#1A1A1A]">{item.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-sans text-xs font-bold text-[#1A1A1A]">{item.price}</span>
                          <span className="font-sans text-[10px] text-[#757575] line-through">{item.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#F9F8F6] px-3 py-1.5 font-sans text-xs font-semibold text-[#1A1A1A] border border-[#1A1A1A]/10 rounded-sm hover:bg-[#EBEBEB] transition-colors">
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </main>
  );
}
