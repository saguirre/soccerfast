import { NextPage } from "next";

import { TeamGallery } from "@components";

const TeamGalleryPage: NextPage = () => {
  return (
    <div className="h-full bg-white p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="lg:text-center">
          <h2 className="text-base text-sky-500 font-semibold tracking-wide uppercase">Galería</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Mira todas las fotos de nuestros equipos!</p>
        </div>
      </div>
      <div className="p-8">
        <TeamGallery />
      </div>
    </div>
  );
};

export default TeamGalleryPage;
