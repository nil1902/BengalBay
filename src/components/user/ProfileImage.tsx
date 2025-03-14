import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileImageProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  size = "lg",
  className = "",
}) => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        // In a real app, you would upload this to storage
        // and update the user profile
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    if (!currentUser?.displayName) return "U";
    return currentUser.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative rounded-full overflow-hidden ${sizeClasses[size]} border-4 border-amber-100 bg-amber-50`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className={`${sizeClasses[size]}`}>
          <AvatarImage src={image || ""} alt="Profile" />
          <AvatarFallback className="bg-amber-600 text-white text-2xl">
            {getInitials()}
          </AvatarFallback>
        </Avatar>

        {isHovering && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer text-white flex flex-col items-center justify-center"
            >
              <Camera className="h-6 w-6 mb-1" />
              <span className="text-xs">Change</span>
            </label>
          </div>
        )}
      </div>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImage;
