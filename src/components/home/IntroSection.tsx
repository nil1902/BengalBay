import React from "react";
import { Separator } from "../ui/separator";

interface IntroSectionProps {
  title?: string;
  description?: string;
  chefName?: string;
  chefDescription?: string;
  restaurantHistory?: string;
}

const IntroSection = ({
  title = "Welcome to Nil's Kitchen",
  description = "Experience the finest culinary delights in a warm, inviting atmosphere. Our passion for exceptional food and service creates memorable dining experiences for all our guests.",
  chefName = "Chef Nilesh Kumar",
  chefDescription = "With over 15 years of culinary expertise, Chef Nilesh brings his unique vision and passion to every dish, combining traditional techniques with innovative flavors.",
  restaurantHistory = "Established in 2010, Nil's Kitchen began as a small family restaurant and has grown into one of the city's most beloved dining destinations, known for our commitment to quality ingredients and authentic flavors.",
}: IntroSectionProps) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {title}
        </h2>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">{description}</p>
      </div>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">{chefName}</h3>
          <p className="text-gray-600">{chefDescription}</p>
          <div className="pt-4">
            <a
              href="/about"
              className="text-amber-600 hover:text-amber-700 font-medium inline-block"
            >
              Learn more about our team →
            </a>
          </div>
        </div>

        <div className="bg-amber-50 p-8 rounded-lg border border-amber-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Story
          </h3>
          <p className="text-gray-600">{restaurantHistory}</p>
          <div className="pt-4">
            <a
              href="/about"
              className="text-amber-600 hover:text-amber-700 font-medium inline-block"
            >
              Read our full story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
