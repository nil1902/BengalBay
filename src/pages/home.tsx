import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import IntroSection from "@/components/home/IntroSection";
import FeaturedDishes from "@/components/home/FeaturedDishes";

function Home() {
  return (
    <div className="w-full">
      <HeroBanner />
      <IntroSection />
      <FeaturedDishes />
    </div>
  );
}

export default Home;
