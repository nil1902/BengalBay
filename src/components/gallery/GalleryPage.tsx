import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "food" | "restaurant" | "events" | "team";
}

const galleryImages: GalleryImage[] = [
  // Food Images
  {
    id: "f1",
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    alt: "Signature Dish - Butter Chicken",
    category: "food",
  },
  {
    id: "f2",
    src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80",
    alt: "Paneer Tikka Appetizer",
    category: "food",
  },
  {
    id: "f3",
    src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&q=80",
    alt: "Vegetable Biryani",
    category: "food",
  },
  {
    id: "f4",
    src: "https://imgs.search.brave.com/Z0ZZkxbZHUGhaUD7lfPJvSVCH0SdCvlM7C5SlguDr7Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMz/NzIxMzMwOS9waG90/by9ndWxhYi1qYW11/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9TnpESDlPbTIz/aFp5RnNXNkt0NVo1/VUsyT19WUTdhaG80/SDB4b0hBRzg2TT0",
    alt: "Gulab Jamun Dessert",
    category: "food",
  },
  {
    id: "f5",
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80",
    alt: "Chana Masala",
    category: "food",
  },
  {
    id: "f6",
    src: "https://images.unsplash.com/photo-1626508035297-0cd27c397d67?w=1200&q=80",
    alt: "Fish Curry",
    category: "food",
  },
  {
    id: "f7",
    src: "https://imgs.search.brave.com/36UiHPC4R-fCsU2NXqJIz-9BghaENOxDjpepP76LTSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzA4Lzg0LzI0/LzM2MF9GXzYwODg0/MjQxM19oZFlhZHA2/dVNDN2M3cHE2TEpl/dzlzOGdQblJTZ2ps/bi5qcGc",
    alt: "Chicken Biriyani",
    category: "food",
  },

  // Restaurant Images
  {
    id: "r1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    alt: "Restaurant Interior - Main Dining Area",
    category: "restaurant",
  },
  {
    id: "r2",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    alt: "Restaurant Bar Area",
    category: "restaurant",
  },
  {
    id: "r3",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
    alt: "Private Dining Room",
    category: "restaurant",
  },
  {
    id: "r4",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
    alt: "Outdoor Seating Area",
    category: "restaurant",
  },
  {
    id: "r5",
    src: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=1200&q=80",
    alt: "Restaurant Entrance",
    category: "restaurant",
  },

  // Events Images
  {
    id: "e1",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    alt: "Wedding Reception",
    category: "events",
  },
  {
    id: "e2",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    alt: "Corporate Event",
    category: "events",
  },
  {
    id: "e3",
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
    alt: "Birthday Celebration",
    category: "events",
  },
  {
    id: "e4",
    src: "https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=1200&q=80",
    alt: "Private Party",
    category: "events",
  },

  // Team Images
  {
    id: "t1",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80",
    alt: "Chef Nilesh Kumar",
    category: "team",
  },
  {
    id: "t2",
    src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=1200&q=80",
    alt: "Our Culinary Team",
    category: "team",
  },
  {
    id: "t3",
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80",
    alt: "Restaurant Staff",
    category: "team",
  },
  {
    id: "t4",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
    alt: "Service Team",
    category: "team",
  },
];

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a visual journey through our restaurant, delicious dishes,
            special events, and our dedicated team
          </p>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full mb-8"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              onClick={() => handleImageClick(image)}
            >
              <AspectRatio ratio={4 / 3}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </AspectRatio>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="relative">
                <img
                  src={selectedImage?.src}
                  alt={selectedImage?.alt}
                  className="w-full max-h-[80vh] object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>

              <div className="p-4 bg-white">
                <p className="text-lg font-medium">{selectedImage?.alt}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryPage;
