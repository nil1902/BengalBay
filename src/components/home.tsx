import React from "react";
import HeroBanner from "./home/HeroBanner";
import IntroSection from "./home/IntroSection";
import FeaturedDishes from "./home/FeaturedDishes";

function HomeComponent() {
  return (
    <div className="w-full">
      <HeroBanner />
      <IntroSection />
      <FeaturedDishes />
    </div>
  );
}

export default HomeComponent;
