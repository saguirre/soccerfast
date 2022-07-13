import { useEffect, useState } from "react";
import { ImageViewer } from "../ImageViewer";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (image: string, index: number) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setImageViewerOpen(true);
  };

  const moveToNextImage = () => {
    console.log("LLamando move next");
    console.log("Indice en nextImage: ", currentImageIndex);
    if (currentImageIndex < images.length - 1) {
      console.log("Entre al if en nextImage: ");
      setCurrentImageIndex((currentIndex) => {
        return (currentIndex += 1);
      });
    }
  };

  const moveToPreviousImage = () => {
    console.log("LLamando move previous");
    console.log("Indice en movePrevious: ", currentImageIndex);
    if (currentImageIndex > 0) {
      console.log("Entre al if en previousImage: ");
      setCurrentImageIndex((currentIndex) => {
        return (currentIndex -= 1);
      });
    }
  };

  useEffect(() => {
    console.log("Se llama esto?");
    if (currentImageIndex < images.length - 1 && currentImageIndex > 0) {
      setCurrentImage(images[currentImageIndex]);
    }
  }, [currentImageIndex]);

  return (
    <div>
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {images.map((image, index) => (
          <li key={index} className="relative rounded-lg">
            <div
              onClick={() => openImage(image, index)}
              className="group aspect-w-10 aspect-h-7 rounded-lg border border-slate-200 hover:border-slate-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-sky-500 overflow-hidden"
            >
              <img
                src={image}
                alt={image}
                className="object-cover pointer-events-none rounded-lg group-hover:opacity-75 h-fill p-4"
              />
              <button type="button" className="absolute inset-0 focus:outline-none"></button>
            </div>
          </li>
        ))}
      </ul>
      <ImageViewer
        image={currentImage}
        handleClose={() => setImageViewerOpen(false)}
        open={imageViewerOpen}
        isLast={currentImageIndex === images.length - 1}
        isFirst={currentImageIndex === 0}
        moveToNext={moveToNextImage}
        moveToPrevious={moveToPreviousImage}
      />
    </div>
  );
};
