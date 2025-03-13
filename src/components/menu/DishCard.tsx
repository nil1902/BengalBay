import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface DishCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  rating?: number;
  category?: string;
  isSpecial?: boolean;
  onAddToCart?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const DishCard = ({
  id = "1",
  name = "Spicy Chicken Pasta",
  description = "Tender chicken pieces in a spicy tomato sauce with fresh herbs and parmesan cheese.",
  price = 499, // Price in INR
  image = "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80",
  rating = 4.5,
  category = "Pasta",
  isSpecial = false,
  onAddToCart = () => console.log("Add to cart clicked"), // Default handler
  onFavorite = () => {},
}: DishCardProps) => {
  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative">
        <div className="h-[180px] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {isSpecial && (
          <Badge className="absolute right-2 top-2 bg-red-500 text-white">
            Special
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
          onClick={() => onFavorite(id)}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="mb-2 line-clamp-2 text-sm text-gray-600">{description}</p>
        <div className="flex items-center">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold text-gray-900">
          ₹{price.toFixed(2)}
        </span>
        <Button
          size="sm"
          className="bg-primary text-white hover:bg-primary/90"
          onClick={() => onAddToCart(id)}
          aria-label="Add to cart"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
