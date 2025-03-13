import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

const HeroBanner = ({
  title = "Welcome to Nil's Kitchen",
  subtitle = "Experience authentic flavors with our handcrafted dishes made from the freshest ingredients",
  imageUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
}: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[600px] bg-slate-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">{subtitle}</p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => (window.location.href = "/reservations")}
          >
            Book a Table
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-amber-600 hover:border-amber-600"
            onClick={() => (window.location.href = "/menu")}
          >
            Order Online <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Optional Badge */}
        <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium">
          Open Today: 11:00 AM - 10:00 PM
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
