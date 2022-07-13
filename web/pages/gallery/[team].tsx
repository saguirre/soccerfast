import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ImageGallery, Title } from "@components";

const images = [
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/cerro1.jpg?2285562",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/cerro2.jpg?2285563",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/11.jpg?2485155",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/2.jpg?2485167",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/5.jpg?2485169",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/6.jpg?2485171",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/13.jpg?2485173",
  // },
  // {
  //   source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/14.jpg?2485174",
  // },
  "/escudo-furiosos.png",
  "/escudo-monterrey.png",
  "/escudo-racing.png",
  "/escudo-rio-de-la-plata.png",
  "/luis-campeon.jpeg",
  "/escudo-cerro.png",
  "/escudo-beach-city.png",
];

const ImageGalleryPage: NextPage = () => {
  const router = useRouter();
  const team = router.query.team as string;

  useEffect(() => {
    if (router.isReady) {
    }
  }, []);

  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title="Fotos" subtitle={`Fotos del equipo ${team}.`} />
      </div>
      <div className="p-8">
        <ImageGallery images={images} />;
      </div>
    </div>
  );
};

export default ImageGalleryPage;
