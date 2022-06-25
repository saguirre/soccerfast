import Link from "next/link";
import { useRouter } from "next/router";

const images = [
  {
    title: "C.A. Cerro",
    description: "Actual campeón",
    href: "/gallery/ca-cerro",
    source: "/escudo-cerro.png",
  },
  {
    title: "Monterrey F.C.",
    description: "",
    href: "/gallery/monterrey-fc",
    source: "/escudo-monterrey.png",
  },
  {
    title: "Beach City",
    description: "",
    href: "/gallery/beach-city-fc",
    source: "/escudo-beach-city.png",
  },
  {
    title: "Racing Club Miami",
    description: "",
    href: "/racing-club-miami",
    source: "/escudo-racing.png",
  },
];

export const TeamGallery: React.FC = () => {
  const router = useRouter();
  const goToImageGallery = (href: string) => {
    console.log(href);
    router.push(href);
  };

  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {images.map((image) => (
        <li key={image.source} className="relative">
          <div
            onClick={() => goToImageGallery(image.href)}
            className="group aspect-w-11 aspect-h-13 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-sky-500 overflow-hidden"
          >
            <img
              src={image.source}
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-75 h-fill p-4"
            />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {image.title}</span>
            </button>
          </div>
          <p className="mt-2 block text-medium font-medium text-gray-900 truncate pointer-events-none">{image.title}</p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{image.description}</p>
        </li>
      ))}
    </ul>
  );
};
