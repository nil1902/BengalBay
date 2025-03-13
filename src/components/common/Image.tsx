import React from "react";
import { getLocalImagePath } from "@/utils/imageUtils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  category: string;
  imageName: string;
  fallbackSrc?: string;
  alt: string;
}

/**
 * Image component that tries to load from local assets first,
 * then falls back to remote URL if needed
 */
const Image: React.FC<ImageProps> = ({
  category,
  imageName,
  fallbackSrc,
  alt,
  className,
  ...props
}) => {
  const [src, setSrc] = React.useState<string>(
    getLocalImagePath(category, imageName),
  );
  const [error, setError] = React.useState<boolean>(false);

  // Handle image load error
  const handleError = () => {
    if (!error && fallbackSrc) {
      setError(true);
      setSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
