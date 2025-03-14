import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { MenuItem } from "./MenuData";
import { useCart } from "../cart/CartContext";

interface FoodDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dish: MenuItem | null;
  onFavorite: (id: string) => void;
}

const FoodDetailDialog: React.FC<FoodDetailDialogProps> = ({
  isOpen,
  onClose,
  dish,
  onFavorite,
}) => {
  const { addToCart } = useCart();

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart(dish);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  // Calculate available quantity (mock data)
  const availableQuantity = Math.floor(Math.random() * 20) + 5;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl overflow-hidden p-0">
        <div className="flex flex-col md:flex-row">
          {/* Food Image */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            {dish.isSpecial && (
              <Badge className="absolute left-2 top-2 bg-red-500 text-white">
                Special
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
              onClick={() => onFavorite(dish.id)}
            >
              <Heart className="h-5 w-5 fill-current" />
            </Button>
          </div>

          {/* Food Details */}
          <div className="p-6 w-full md:w-1/2">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {dish.name}
                  </DialogTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-700"
                    >
                      {dish.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-700"
                    >
                      {dish.type}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(dish.price)}
                </span>
              </div>
            </DialogHeader>

            <DialogDescription className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="mt-1 text-gray-600">{dish.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Availability
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {availableQuantity > 10
                      ? "In Stock"
                      : availableQuantity > 0
                        ? `Only ${availableQuantity} left in stock!`
                        : "Out of Stock"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Ingredients
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {dish.type === "veg"
                      ? "Fresh vegetables, aromatic spices, cream, butter, and herbs."
                      : dish.type === "non-veg"
                        ? "Tender meat, aromatic spices, onions, tomatoes, and herbs."
                        : dish.type === "dessert"
                          ? "Milk, sugar, cardamom, saffron, and nuts."
                          : "Fresh ingredients and authentic spices."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Preparation Time
                  </h3>
                  <p className="mt-1 text-gray-600">20-30 minutes</p>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetailDialog;
