"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

function ScrollRestorer() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollRestorer />
      {children as any}
    </ReactLenis>
  );
}
