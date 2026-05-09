"use client";

import { useState } from "react";

function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1A1A1A]/20">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-8 group outline-none"
      >
        <span className="font-serif text-2xl md:text-3xl text-[#1A1A1A] group-hover:text-[#8A9A86] transition-colors">{title}</span>
        
        {/* Animated (+) to (x) Icon */}
        <span className="relative w-6 h-6 flex items-center justify-center shrink-0 ml-4">
          <span className={`absolute w-full h-[1px] bg-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
          <span className={`absolute w-full h-[1px] bg-[#1A1A1A] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? '-rotate-45' : 'rotate-90'}`} />
        </span>
      </button>
      
      {/* CSS Grid Hack for Smooth Height Transition */}
      <div 
        className="grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-8 font-sans text-base md:text-lg text-[#757575] leading-relaxed max-w-3xl pr-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareGuidePage() {
  return (
    <main className="w-full min-h-screen bg-[#F9F8F6] pt-40 pb-32 px-6 md:px-12">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#757575] mb-6">Atelier Orello</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[1.1] mb-8 tracking-tight">
          Care & Sustainability
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#757575] leading-relaxed max-w-2xl mx-auto">
          A hand-knotted rug is a living artifact. With the right care, it will not only survive a lifetime but will actively grow more beautiful, its patina deepening with your home&apos;s history.
        </p>
      </div>

      {/* Magazine Layout with Embedded Floating Video */}
      <div className="max-w-6xl mx-auto mb-32 md:mb-48">
        <div className="w-full md:columns-2 gap-16 font-sans text-lg text-[#1A1A1A] leading-[2] text-justify md:text-left">
          
          <p className="mb-8">
            <span className="font-serif text-7xl md:text-8xl float-left mr-4 leading-[0.8] mt-2 text-[#8A9A86]">T</span>
            he journey of an Orello rug begins high in the mountains, where the cold climate forces sheep to produce fleece incredibly rich in lanolin. This natural wax is the absolute secret to a luxury rug&apos;s durability and stain resistance. When we spin this wool, we preserve the lanolin, ensuring your piece arrives with an inherent, organic armor against the elements of daily life.
          </p>

          {/* Embedded Float Video - Acts like a magazine image pull-out */}
          <div className="w-full sm:w-[50%] md:w-[70%] float-right ml-8 mb-8 mt-2 relative aspect-[3/4] overflow-hidden bg-[#EBEBEB]">
            <video 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
              autoPlay 
              muted 
              loop 
              playsInline
              src="https://cdn.pixabay.com/video/2016/08/22/4762-180128456_tiny.mp4"
            />
            <p className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-widest text-[#F9F8F6] z-10 drop-shadow-md">
              Sun-drying process
            </p>
          </div>

          <p className="mb-8">
            We believe that true sustainability is creating something you never have to throw away. Fast furnishings end up in landfills; an Orello rug ends up in your grandchildren&apos;s home. We strictly utilize natural dyes derived from madder root, indigo, and walnut husks, completely bypassing the toxic chemical runoff associated with synthetic rug manufacturing. 
          </p>

          <p className="mb-8">
            Our washing process utilizes glacial meltwater, returning it to the ecosystem filtered and clean. There are no shortcuts here. The process is slow, deliberate, and honors both the environment and the master artisans who dedicate months of their lives to knotting a single piece by hand.
          </p>

        </div>
      </div>

      {/* Accordion Stains Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12">Treating Specific Stains</h2>
        
        <div className="border-t border-[#1A1A1A]/20">
          <AccordionItem title="Liquid Spills (Coffee, Wine, Water)">
            Speed is your best defense. Immediately blot—never rub—the spill with a clean, dry, un-dyed cotton cloth or paper towel. Press down firmly to absorb as much liquid as possible. If the stain persists, mix a solution of 1/4 cup white vinegar, 1/2 tsp gentle dish soap, and 2 cups room temperature water. Dab gently with a sponge, then blot dry.
          </AccordionItem>
          
          <AccordionItem title="Mud & Dirt">
            Let it dry completely first. Attempting to clean wet mud will only push the dirt deeper into the wool fibers. Once fully dry, vacuum the area gently without the beater bar engaged. For any remaining residue, brush lightly with a soft-bristled brush and vacuum again.
          </AccordionItem>

          <AccordionItem title="Oil & Grease">
            Apply a generous amount of baking soda or cornstarch directly onto the grease stain to absorb the oil. Leave it undisturbed for at least 4-6 hours (overnight is best). Vacuum up the powder. If a mark remains, dab with a cloth slightly dampened with rubbing alcohol, then blot dry.
          </AccordionItem>

          <AccordionItem title="Routine Maintenance">
            Vacuum once a week using suction only—never use a rotating beater bar, as it will tear the hand-knotted fibers and fray the fringes. Rotate your rug 180 degrees every six months to ensure even wear and fading from sunlight. We recommend professional wet-washing every 3-5 years.
          </AccordionItem>
        </div>
      </div>

    </main>
  );
}
