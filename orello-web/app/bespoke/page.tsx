"use client";

import { useState } from "react";
import Image from "next/image";

const patterns = [
  { id: "nomad", name: "The Nomad", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=500" },
  { id: "desert", name: "Desert Sand", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=500" },
  { id: "midnight", name: "Midnight Indigo", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=500" },
];

export default function BespokePage() {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [width, setWidth] = useState<number>(8);
  const [length, setLength] = useState<number>(10);

  // Safely fallback if inputs are wiped empty
  const safeWidth = width || 1;
  const safeLength = length || 1;

  // Calculate proportional dimensions for the SVG visualizer
  const maxDim = 400; // Max pixels bounding box
  const ratio = safeWidth / safeLength;
  
  let visWidth = maxDim;
  let visLength = maxDim;
  
  if (ratio > 1) {
    // Wider than long
    visLength = maxDim / ratio;
  } else {
    // Longer than wide
    visWidth = maxDim * ratio;
  }

  return (
    <main className="w-full min-h-screen bg-[#F9F8F6] flex flex-col md:flex-row pt-24 md:pt-0">
      
      {/* Left Column: Form Inputs */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto md:h-screen">
        <div className="mt-8 md:mt-12 mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">Bespoke Studio</h1>
          <p className="font-sans text-[#757575] leading-relaxed">
            Commission a completely custom piece scaled to the exact dimensions of your space.
          </p>
        </div>

        {/* Step 1: Base Pattern */}
        <section className="mb-16">
          <p className="font-sans text-xs uppercase tracking-widest text-[#757575] mb-6 border-b border-[#1A1A1A]/10 pb-2">Step 01 / Base Pattern</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {patterns.map(pattern => (
              <button 
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern)}
                className={`relative aspect-[4/5] overflow-hidden border-2 transition-all ${
                  selectedPattern.id === pattern.id ? 'border-[#1A1A1A] p-1' : 'border-transparent hover:border-[#1A1A1A]/20'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image src={pattern.image} alt={pattern.name} fill className="object-cover" />
                </div>
                <div className={`absolute bottom-2 left-2 text-[10px] font-sans uppercase tracking-widest bg-[#F9F8F6] px-2 py-1 transition-opacity ${selectedPattern.id === pattern.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                  {pattern.name}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Dimensions */}
        <section className="mb-16">
          <p className="font-sans text-xs uppercase tracking-widest text-[#757575] mb-6 border-b border-[#1A1A1A]/10 pb-2">Step 02 / Dimensions (Feet)</p>
          <div className="flex gap-8">
            <div className="w-1/2">
              <label className="block font-sans text-sm tracking-widest text-[#1A1A1A] mb-2">Width</label>
              <input 
                type="number" 
                min="1" 
                max="50"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full bg-transparent border-b border-[#1A1A1A]/30 focus:border-[#1A1A1A] outline-none py-2 font-serif text-4xl text-[#1A1A1A] transition-colors"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-sans text-sm tracking-widest text-[#1A1A1A] mb-2">Length</label>
              <input 
                type="number" 
                min="1" 
                max="50"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full bg-transparent border-b border-[#1A1A1A]/30 focus:border-[#1A1A1A] outline-none py-2 font-serif text-4xl text-[#1A1A1A] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Step 3: Contact */}
        <section className="mb-16">
          <p className="font-sans text-xs uppercase tracking-widest text-[#757575] mb-6 border-b border-[#1A1A1A]/10 pb-2">Step 03 / Swatch Request</p>
          <div className="flex flex-col gap-6">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] outline-none py-4 font-sans placeholder:text-[#757575] transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#1A1A1A] outline-none py-4 font-sans placeholder:text-[#757575] transition-colors"
            />
            <button className="w-full bg-[#1A1A1A] text-[#F9F8F6] py-6 font-sans uppercase tracking-[0.1em] text-sm hover:bg-[#8A9A86] transition-colors mt-4">
              Request Swatch & Quote
            </button>
          </div>
        </section>
      </div>

      {/* Right Column: Interactive SVG Wireframe Visualizer */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen bg-[#EBEBEB] sticky top-0 flex flex-col items-center justify-center p-8 border-l border-[#1A1A1A]/10">
        
        <p className="font-sans text-xs uppercase tracking-widest text-[#757575] absolute top-8 md:top-32 text-center">Live Wireframe Visualizer</p>
        
        <div className="relative flex items-center justify-center w-[400px] h-[400px]">
          
          <svg 
            className="transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] drop-shadow-xl"
            width={visWidth} 
            height={visLength} 
            viewBox={`0 0 ${visWidth} ${visLength}`}
          >
            {/* Base Canvas */}
            <rect 
              x="0" 
              y="0" 
              width={visWidth} 
              height={visLength} 
              fill="#F9F8F6" 
              stroke="#1A1A1A" 
              strokeWidth="2"
            />
            
            {/* Faint Pattern Overlay (using an image filter or just simple styling) */}
            <rect 
              x="2" 
              y="2" 
              width={visWidth - 4} 
              height={visLength - 4} 
              fill="#1A1A1A"
              fillOpacity="0.05"
            />

            {/* Inner Border representing Hand-Knotting Margin */}
            <rect 
              x="16" 
              y="16" 
              width={visWidth - 32} 
              height={visLength - 32} 
              fill="transparent" 
              stroke="#1A1A1A" 
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Dynamic Dimensions Text rendered inside the SVG */}
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fill="#1A1A1A" 
              className="font-sans text-xs tracking-widest uppercase"
            >
              {safeWidth}&apos; W × {safeLength}&apos; L
            </text>

            {/* Fringes (Top) - dynamically mapped across the width */}
            {Array.from({ length: Math.floor(visWidth / 6) }).map((_, i) => (
              <line key={`top-${i}`} x1={3 + i * 6} y1="0" x2={3 + i * 6} y2="-6" stroke="#757575" strokeWidth="1" />
            ))}
            
            {/* Fringes (Bottom) */}
            {Array.from({ length: Math.floor(visWidth / 6) }).map((_, i) => (
              <line key={`bot-${i}`} x1={3 + i * 6} y1={visLength} x2={3 + i * 6} y2={visLength + 6} stroke="#757575" strokeWidth="1" />
            ))}
          </svg>
          
        </div>
        
      </div>

    </main>
  );
}
