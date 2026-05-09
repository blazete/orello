"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, closeAll } = useUIStore();
  const { items, removeFromCart, updateQuantity, cartTotal } = useCartStore();
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    gsap.set(".cart-overlay", { opacity: 0, display: "none" });
    gsap.set(".cart-content", { xPercent: 100, visibility: "visible" });
    gsap.set(".cart-item", { y: 20, opacity: 0 });

    tl.current = gsap.timeline({ paused: true })
      .to(".cart-overlay", { opacity: 1, display: "block", duration: 0.4, ease: "power2.out" })
      .to(".cart-content", { xPercent: 0, duration: 0.6, ease: "power3.out" }, "<")
      .to(".cart-item", { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }, "-=0.2");
  }, { scope: container });

  useEffect(() => {
    if (isCartOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isCartOpen]);

  return (
    <div ref={container} className="fixed inset-0 z-[60] pointer-events-none">
      <div 
        className="cart-overlay absolute inset-0 bg-black/40 pointer-events-auto backdrop-blur-sm"
        style={{ opacity: 0, display: 'none' }}
        onClick={closeAll}
      />
      
      <div 
        className="cart-content absolute top-0 right-0 h-screen w-full sm:w-[450px] bg-[#F9F8F6] pointer-events-auto flex flex-col p-8 md:p-10 border-l border-[#1A1A1A]/10"
        style={{ visibility: 'hidden' }}
      >
        
        <div className="flex justify-between items-center mb-8 cart-item shrink-0">
          <h2 className="font-serif text-3xl text-[#1A1A1A]">Your Bag</h2>
          <button onClick={closeAll} className="font-sans text-xs uppercase tracking-widest text-[#757575] hover:text-[#1A1A1A]">Close</button>
        </div>

        <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2">
          {items.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full opacity-50 cart-item">
               <p className="font-serif text-xl text-[#1A1A1A] mb-4">Your bag is empty.</p>
               <button onClick={closeAll} className="font-sans text-xs uppercase tracking-widest border-b border-[#1A1A1A] pb-1 hover:text-[#B86B5D] hover:border-[#B86B5D] transition-colors">Continue Shopping</button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item, i) => (
                <div key={`${item.id}-${item.size}-${i}`} className="cart-item flex gap-4 border-b border-[#1A1A1A]/10 pb-6">
                  <div className="relative w-24 h-32 bg-[#EBEBEB] overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-grow py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-lg text-[#1A1A1A] leading-tight max-w-[150px]">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-[#757575] hover:text-red-500 text-xs uppercase tracking-widest">Remove</button>
                      </div>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-[#757575]">Size: {item.size}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-[#1A1A1A]/20">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-3 py-1 text-[#757575] hover:text-[#1A1A1A]">-</button>
                        <span className="font-sans text-xs w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-3 py-1 text-[#757575] hover:text-[#1A1A1A]">+</button>
                      </div>
                      <p className="font-sans text-sm tracking-widest text-[#1A1A1A]">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Area */}
        {items.length > 0 && (
          <div className="mt-6 border-t border-[#1A1A1A]/10 pt-6 cart-item shrink-0 bg-[#F9F8F6]">
            <div className="flex justify-between items-center mb-6 font-sans uppercase tracking-widest text-sm text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>₹{cartTotal().toLocaleString()}</span>
            </div>
            <Link 
              href="/cart" 
              onClick={closeAll}
              className="w-full bg-[#1A1A1A] text-[#F9F8F6] py-5 font-sans uppercase tracking-[0.1em] text-sm hover:bg-[#8A9A86] transition-colors text-center block"
            >
              Review Order
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
