import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DishCard from "../menu/DishCard";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isSpecial: boolean;
}

interface FeaturedDishesProps {
  title?: string;
  subtitle?: string;
  dishes?: Dish[];
  onAddToCart?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const FeaturedDishes = ({
  title = "Featured Dishes",
  subtitle = "Our chef's special selection of signature dishes that you must try",
  dishes = [
    {
      id: "1",
      name: "Butter Chicken",
      description:
        "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
      rating: 4.8,
      category: "Main Course",
      isSpecial: true,
    },
    {
      id: "2",
      name: "Vegetable Biryani",
      description:
        "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
      rating: 4.6,
      category: "Rice",
      isSpecial: false,
    },
    {
      id: "3",
      name: "Garlic Naan",
      description:
        "Soft, fluffy bread topped with garlic and butter, baked in a tandoor",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&q=80",
      rating: 4.7,
      category: "Bread",
      isSpecial: false,
    },
    {
      id: "4",
      name: "Mango Lassi",
      description:
        "Refreshing yogurt drink blended with ripe mangoes and a hint of cardamom",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
      rating: 4.5,
      category: "Beverage",
      isSpecial: true,
    },
    {
      id: "5",
      name: "Paneer Tikka",
      description:
        "Chunks of cottage cheese marinated in spices and grilled to perfection",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
      rating: 4.4,
      category: "Appetizer",
      isSpecial: false,
    },
  ],
  onAddToCart = (id) => console.log(`Added dish ${id} to cart`),
  onFavorite = (id) => console.log(`Added dish ${id} to favorites`),
}: FeaturedDishesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, dishes.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mx-auto max-w-2xl text-gray-600">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="w-full px-4 sm:w-1/2 md:w-1/3 flex-shrink-0"
                  >
                    <DishCard
                      id={dish.id}
                      name={dish.name}
                      description={dish.description}
                      price={dish.price}
                      image={dish.image}
                      rating={dish.rating}
                      category={dish.category}
                      isSpecial={dish.isSpecial}
                      onAddToCart={onAddToCart}
                      onFavorite={onFavorite}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow-md"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({
            length: Math.min(5, Math.ceil(dishes.length / itemsPerView)),
          }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`h-2 w-2 rounded-full p-0 ${currentIndex === index ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            className="bg-amber-600 text-white hover:bg-amber-700"
            onClick={() => (window.location.href = "/menu")}
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDishes;
