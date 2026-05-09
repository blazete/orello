"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCartStore();

  return (
    <main className="w-full min-h-screen bg-[#F9F8F6] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-12 border-b border-[#1A1A1A]/10 pb-8">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Cart Items Table */}
        <div className="w-full lg:w-2/3">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-sans text-[#757575] mb-8 uppercase tracking-widest text-sm">Your bag is currently empty.</p>
              <Link href="/shop" className="inline-block bg-[#1A1A1A] text-[#F9F8F6] px-8 py-4 font-sans text-xs uppercase tracking-[0.1em] hover:bg-[#8A9A86] transition-colors">
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item, i) => (
                <div key={`${item.id}-${item.size}-${i}`} className="flex flex-col md:flex-row gap-6 border-b border-[#1A1A1A]/10 pb-8">
                  <div className="relative w-full md:w-40 aspect-[3/4] bg-[#EBEBEB] overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-2xl text-[#1A1A1A]">{item.name}</h3>
                        <p className="font-sans text-lg tracking-widest text-[#1A1A1A] hidden md:block">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <p className="font-sans text-xs uppercase tracking-widest text-[#757575] mb-4">Size: {item.size}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-[#1A1A1A]/20">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-4 py-2 text-[#757575] hover:text-[#1A1A1A] transition-colors">-</button>
                        <span className="font-sans text-sm w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-4 py-2 text-[#757575] hover:text-[#1A1A1A] transition-colors">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} className="font-sans text-xs uppercase tracking-widest text-[#757575] underline underline-offset-4 hover:text-[#B86B5D] transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-8 md:p-10 border border-[#1A1A1A]/10 sticky top-32">
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8">Order Summary</h2>
            
            <div className="flex justify-between font-sans text-sm tracking-widest uppercase text-[#757575] mb-4">
              <span>Subtotal</span>
              <span>₹{cartTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-sans text-sm tracking-widest uppercase text-[#757575] mb-4">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            
            <div className="border-t border-[#1A1A1A]/10 my-6"></div>
            
            <div className="flex justify-between items-end mb-10">
              <span className="font-sans text-sm tracking-widest uppercase text-[#1A1A1A]">Total</span>
              <span className="font-serif text-3xl text-[#1A1A1A]">₹{cartTotal().toLocaleString()}</span>
            </div>

            <button 
              className={`w-full py-5 font-sans uppercase tracking-[0.1em] text-sm transition-colors ${
                items.length === 0 
                  ? 'bg-[#EBEBEB] text-[#757575] cursor-not-allowed' 
                  : 'bg-[#B0714E] text-white hover:bg-[#8F5B3E]'
              }`}
              disabled={items.length === 0}
            >
              Proceed to Payment
            </button>
            
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#757575] text-center mt-6">
              Secure Checkout • Global Priority Shipping
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
