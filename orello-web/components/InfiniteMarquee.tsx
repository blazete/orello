import React from 'react';

export default function InfiniteMarquee() {
  const symbol = (
    <svg width="32" height="32" viewBox="0 0 100 100" className="inline-block mx-8 shrink-0">
      <rect width="100" height="100" rx="28" fill="currentColor" />
      <ellipse cx="50" cy="50" rx="42" ry="20" transform="rotate(-45 50 50)" fill="#B86B5D" />
    </svg>
  );

  const block = (
    <div className="flex items-center shrink-0 pr-8">
      <span className="font-serif text-xl md:text-2xl uppercase tracking-widest shrink-0">Unroll Your Story</span>
      {symbol}
    </div>
  );

  // Enough blocks to guarantee the width is larger than standard screen sizes
  const blocks = Array(10).fill(null);

  return (
    <div className="w-full bg-[#B86B5D] text-[#F9F8F6] overflow-hidden py-5 flex items-center border-y border-[#1A1A1A]/10">
      <div className="flex shrink-0 animate-marquee">
        {blocks.map((_, i) => <React.Fragment key={i}>{block}</React.Fragment>)}
      </div>
      <div className="flex shrink-0 animate-marquee" aria-hidden="true">
        {blocks.map((_, i) => <React.Fragment key={`dup-${i}`}>{block}</React.Fragment>)}
      </div>
    </div>
  );
}
