import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ImageGallery } from "@components";

const ImageGalleryPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, []);
  return <ImageGallery />;
};

export default ImageGalleryPage;
