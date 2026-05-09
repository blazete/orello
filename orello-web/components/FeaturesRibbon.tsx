export default function FeaturesRibbon() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Pan India delivery",
      description: "Receive your order anywhere in the India."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Fast shipping",
      description: "Super fast shipping."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      title: "Customer service",
      description: "We are available from monday to friday to answer your questions."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <rect x="9" y="11" width="6" height="4" rx="1"></rect>
        </svg>
      ),
      title: "Secure payment",
      description: "Your payment information is processed securely."
    }
  ];

  return (
    <div className="w-full bg-[#F9F8F6] border-t border-[#1A1A1A]/10 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center p-12 lg:p-16">
            <div className="text-[#1A1A1A] mb-4">
              {feature.icon}
            </div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#1A1A1A] mb-3">{feature.title}</h3>
            <p className="font-sans text-[11px] text-[#757575] leading-relaxed max-w-[220px]">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
