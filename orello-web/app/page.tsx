import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import Categories from "@/components/Categories";
import ShopBy from "@/components/ShopBy";
import BestSellers from "@/components/BestSellers";
import AboutUs from "@/components/AboutUs";
import TextureShowcase from "@/components/TextureShowcase";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <InfiniteMarquee />
      <Categories />
      <ShopBy />
      <BestSellers />
      <AboutUs />
      <TextureShowcase />
    </main>
  );
}
