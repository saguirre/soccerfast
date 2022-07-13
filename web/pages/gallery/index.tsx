import { NextPage } from "next";

import { TeamGallery, Title } from "@components";

const TeamGalleryPage: NextPage = () => {
  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title="Galería" subtitle="Mira todas las fotos de nuestros equipos!" />
      </div>
      <div className="p-8">
        <TeamGallery />
      </div>
    </div>
  );
};

export default TeamGalleryPage;
