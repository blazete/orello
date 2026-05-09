import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import NavigationDrawer from "@/components/NavigationDrawer";
import CartDrawer from "@/components/CartDrawer";
import FeaturesRibbon from "@/components/FeaturesRibbon";
import Footer from "@/components/Footer";

// Setting up the Kasthall-inspired typography
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Orello | Hand-Knotted Luxury",
  description: "Bespoke, hand-knotted rugs for modern spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-[#F9F8F6] text-[#1A1A1A] antialiased" suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <NavigationDrawer />
          <CartDrawer />
          {children}
          <FeaturesRibbon />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
