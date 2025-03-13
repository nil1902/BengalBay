export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  type:
    | "veg"
    | "non-veg"
    | "drinks"
    | "dessert"
    | "biryani"
    | "bread"
    | "starter";
  isSpecial: boolean;
}

export const menuItems: MenuItem[] = [
  // Vegetarian Dishes
  {
    id: "v1",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in a rich, spiced tomato gravy",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
    rating: 4.7,
    category: "Main Course",
    type: "veg",
    isSpecial: true,
  },
  {
    id: "v2",
    name: "Vegetable Biryani",
    description:
      "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
    rating: 4.5,
    category: "Rice",
    type: "veg",
    isSpecial: false,
  },
  {
    id: "v3",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter and spices",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&q=80",
    rating: 4.6,
    category: "Main Course",
    type: "veg",
    isSpecial: false,
  },
  {
    id: "v4",
    name: "Chana Masala",
    description:
      "Chickpeas cooked in a spicy tomato-based sauce with Indian spices",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
    rating: 4.4,
    category: "Main Course",
    type: "veg",
    isSpecial: false,
  },
  {
    id: "v5",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach sauce",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107aa8e1fa?w=500&q=80",
    rating: 4.5,
    category: "Main Course",
    type: "veg",
    isSpecial: false,
  },
  {
    id: "v6",
    name: "Malai Kofta",
    description: "Potato and paneer dumplings in a rich, creamy tomato sauce",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
    rating: 4.7,
    category: "Main Course",
    type: "veg",
    isSpecial: true,
  },
  {
    id: "v7",
    name: "Aloo Gobi",
    description: "Potatoes and cauliflower cooked with Indian spices",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&q=80",
    rating: 4.3,
    category: "Main Course",
    type: "veg",
    isSpecial: false,
  },

  // Non-Vegetarian Dishes
  {
    id: "nv1",
    name: "Butter Chicken",
    description:
      "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
    rating: 4.8,
    category: "Main Course",
    type: "non-veg",
    isSpecial: true,
  },
  {
    id: "nv2",
    name: "Chicken Tikka",
    description: "Marinated chicken pieces grilled in a tandoor",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
    rating: 4.6,
    category: "Starter",
    type: "starter",
    isSpecial: false,
  },
  {
    id: "nv3",
    name: "Lamb Rogan Josh",
    description: "Tender lamb pieces cooked in a rich, aromatic Kashmiri gravy",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1545247181-516773cae754?w=500&q=80",
    rating: 4.6,
    category: "Main Course",
    type: "non-veg",
    isSpecial: false,
  },
  {
    id: "nv4",
    name: "Fish Curry",
    description: "Fresh fish fillets simmered in a tangy coconut curry sauce",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1626508035297-0cd27c397d67?w=500&q=80",
    rating: 4.5,
    category: "Main Course",
    type: "non-veg",
    isSpecial: false,
  },
  {
    id: "nv5",
    name: "Chicken Korma",
    description: "Chicken pieces in a mild, creamy sauce with nuts and spices",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
    rating: 4.7,
    category: "Main Course",
    type: "non-veg",
    isSpecial: false,
  },
  {
    id: "nv6",
    name: "Tandoori Chicken",
    description:
      "Whole chicken marinated in yogurt and spices, roasted in a tandoor",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=500&q=80",
    rating: 4.8,
    category: "Main Course",
    type: "non-veg",
    isSpecial: true,
  },
  {
    id: "nv7",
    name: "Prawn Masala",
    description: "Succulent prawns cooked in a spicy tomato-based sauce",
    price: 649,
    image:
      "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=500&q=80",
    rating: 4.6,
    category: "Main Course",
    type: "non-veg",
    isSpecial: false,
  },

  // Biryani Section
  {
    id: "b1",
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with tender chicken and aromatic spices",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80",
    rating: 4.7,
    category: "Rice",
    type: "biryani",
    isSpecial: true,
  },
  {
    id: "b2",
    name: "Mutton Biryani",
    description:
      "Fragrant basmati rice cooked with tender mutton and aromatic spices",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80",
    rating: 4.8,
    category: "Rice",
    type: "biryani",
    isSpecial: true,
  },
  {
    id: "b3",
    name: "Hyderabadi Biryani",
    description:
      "Authentic Hyderabadi-style biryani with tender meat and aromatic rice",
    price: 649,
    image:
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&q=80",
    rating: 4.9,
    category: "Rice",
    type: "biryani",
    isSpecial: true,
  },
  {
    id: "b4",
    name: "Prawn Biryani",
    description:
      "Fragrant basmati rice cooked with succulent prawns and aromatic spices",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80",
    rating: 4.6,
    category: "Rice",
    type: "biryani",
    isSpecial: false,
  },
  {
    id: "b5",
    name: "Egg Biryani",
    description:
      "Fragrant basmati rice cooked with boiled eggs and aromatic spices",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
    rating: 4.4,
    category: "Rice",
    type: "biryani",
    isSpecial: false,
  },
  {
    id: "b6",
    name: "Lucknowi Biryani",
    description: "Fragrant basmati rice cooked with meat in the Lucknowi style",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80",
    rating: 4.7,
    category: "Rice",
    type: "biryani",
    isSpecial: false,
  },

  // Bread Section
  {
    id: "br1",
    name: "Garlic Naan",
    description:
      "Soft, fluffy bread topped with garlic and butter, baked in a tandoor",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&q=80",
    rating: 4.7,
    category: "Bread",
    type: "bread",
    isSpecial: false,
  },
  {
    id: "br2",
    name: "Butter Naan",
    description: "Soft, fluffy bread brushed with butter, baked in a tandoor",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&q=80",
    rating: 4.6,
    category: "Bread",
    type: "bread",
    isSpecial: false,
  },
  {
    id: "br3",
    name: "Plain Roti",
    description: "Whole wheat bread baked in a tandoor",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
    rating: 4.5,
    category: "Bread",
    type: "bread",
    isSpecial: false,
  },
  {
    id: "br4",
    name: "Cheese Naan",
    description: "Soft, fluffy bread stuffed with cheese, baked in a tandoor",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&q=80",
    rating: 4.8,
    category: "Bread",
    type: "bread",
    isSpecial: true,
  },
  {
    id: "br5",
    name: "Laccha Paratha",
    description: "Layered whole wheat bread, baked in a tandoor",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
    rating: 4.6,
    category: "Bread",
    type: "bread",
    isSpecial: false,
  },

  // Starters
  {
    id: "s1",
    name: "Paneer Tikka",
    description:
      "Chunks of cottage cheese marinated in spices and grilled to perfection",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
    rating: 4.4,
    category: "Appetizer",
    type: "starter",
    isSpecial: false,
  },
  {
    id: "s2",
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
    rating: 4.5,
    category: "Appetizer",
    type: "starter",
    isSpecial: false,
  },
  {
    id: "s3",
    name: "Onion Bhaji",
    description: "Crispy onion fritters spiced with Indian herbs",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
    rating: 4.3,
    category: "Appetizer",
    type: "starter",
    isSpecial: false,
  },
  {
    id: "s4",
    name: "Chicken Pakora",
    description: "Spiced chicken fritters deep-fried to perfection",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
    rating: 4.6,
    category: "Appetizer",
    type: "starter",
    isSpecial: false,
  },
  {
    id: "s5",
    name: "Fish Amritsari",
    description: "Fish fillets marinated in spices and deep-fried",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1626508035297-0cd27c397d67?w=500&q=80",
    rating: 4.7,
    category: "Appetizer",
    type: "starter",
    isSpecial: true,
  },

  // Drinks
  {
    id: "d1",
    name: "Mango Lassi",
    description:
      "Refreshing yogurt drink blended with ripe mangoes and a hint of cardamom",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
    rating: 4.7,
    category: "Beverage",
    type: "drinks",
    isSpecial: true,
  },
  {
    id: "d2",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    rating: 4.6,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },
  {
    id: "d3",
    name: "Fresh Lime Soda",
    description: "Refreshing lime juice with soda water, served sweet or salty",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80",
    rating: 4.4,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },
  {
    id: "d4",
    name: "Watermelon Juice",
    description: "Fresh watermelon juice, perfect for hot summer days",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&q=80",
    rating: 4.5,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },
  {
    id: "d5",
    name: "Rose Milk",
    description: "Chilled milk flavored with rose syrup",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
    rating: 4.3,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },
  {
    id: "d6",
    name: "Sweet Lassi",
    description: "Traditional yogurt drink sweetened with sugar",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
    rating: 4.5,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },
  {
    id: "d7",
    name: "Mango Shake",
    description: "Thick milkshake made with fresh mangoes",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
    rating: 4.7,
    category: "Beverage",
    type: "drinks",
    isSpecial: false,
  },

  // Desserts
  {
    id: "ds1",
    name: "Gulab Jamun",
    description:
      "Soft milk solids dumplings soaked in rose-flavored sugar syrup",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1601303516361-9e7a1e01a7ea?w=500&q=80",
    rating: 4.8,
    category: "Dessert",
    type: "dessert",
    isSpecial: true,
  },
  {
    id: "ds2",
    name: "Rasmalai",
    description:
      "Soft cottage cheese patties soaked in sweetened, thickened milk",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1605197161470-5d2a9af0c3a3?w=500&q=80",
    rating: 4.7,
    category: "Dessert",
    type: "dessert",
    isSpecial: false,
  },
  {
    id: "ds3",
    name: "Kheer",
    description:
      "Creamy rice pudding flavored with cardamom and topped with nuts",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?w=500&q=80",
    rating: 4.6,
    category: "Dessert",
    type: "dessert",
    isSpecial: false,
  },
  {
    id: "ds4",
    name: "Kulfi",
    description: "Traditional Indian ice cream in various flavors",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&q=80",
    rating: 4.5,
    category: "Dessert",
    type: "dessert",
    isSpecial: false,
  },
  {
    id: "ds5",
    name: "Jalebi",
    description: "Crispy, syrup-soaked sweet pretzel-like dessert",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1601303516361-9e7a1e01a7ea?w=500&q=80",
    rating: 4.6,
    category: "Dessert",
    type: "dessert",
    isSpecial: false,
  },
  {
    id: "ds6",
    name: "Gajar Halwa",
    description: "Sweet carrot pudding garnished with nuts",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?w=500&q=80",
    rating: 4.7,
    category: "Dessert",
    type: "dessert",
    isSpecial: false,
  },
];
