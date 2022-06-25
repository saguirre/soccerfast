const images = [
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/cerro1.jpg?2285562",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/cerro2.jpg?2285563",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/11.jpg?2485155",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/2.jpg?2485167",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/5.jpg?2485169",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/6.jpg?2485171",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/13.jpg?2485173",
  },
  {
    source: "https://site-469973.mozfiles.com/files/469973/galleries/9957211/large/14.jpg?2485174",
  },
];

export const ImageGallery: React.FC = () => {
  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {images.map((image, index) => (
        <li key={index} className="relative rounded-lg">
          <div className="group aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-sky-500 overflow-hidden">
            <img
              src={image.source}
              alt=""
              className="object-cover pointer-events-none rounded-lg group-hover:opacity-75 h-fill p-4"
            />
            <button type="button" className="absolute inset-0 focus:outline-none"></button>
          </div>
        </li>
      ))}
    </ul>
  );
};
