"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";


const DEFAULT_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";


type BlurImageProps = ImageProps & {
  blurDataURL?: string;
};

function BlurImage({ blurDataURL = DEFAULT_BLUR, className, ...props }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Image
      {...props}
      className={`
        ${className}
        duration-700 ease-in-out
        ${isLoading ? "scale-105 blur-lg opacity-70" : "scale-100 blur-0 opacity-100"}
      `}
      onLoad={() => setIsLoading(false)}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

export default BlurImage;
