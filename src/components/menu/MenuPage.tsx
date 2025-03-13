import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DishCard from "./DishCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { menuItems } from "./MenuData";

import { MenuItem } from "./MenuData";

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredDishes = menuItems.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && dish.type === activeTab;
  });

  const handleAddToCart = (id: string) => {
    console.log(`Added dish ${id} to cart`);
    // Implement cart functionality here
  };

  const handleFavorite = (id: string) => {
    console.log(`Added dish ${id} to favorites`);
    // Implement favorites functionality here
  };

  return (
    <div className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of delicious dishes prepared with the finest
            ingredients and authentic recipes
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search dishes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-7 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="veg">Vegetarian</TabsTrigger>
              <TabsTrigger value="non-veg">Non-Veg</TabsTrigger>
              <TabsTrigger value="biryani">Biryani</TabsTrigger>
              <TabsTrigger value="bread">Bread</TabsTrigger>
              <TabsTrigger value="starter">Starters</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
              <TabsTrigger value="dessert">Desserts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.image}
                rating={dish.rating}
                category={dish.category}
                isSpecial={dish.isSpecial}
                onAddToCart={handleAddToCart}
                onFavorite={handleFavorite}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">
                No dishes found matching your search.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
