interface Props {
  location: string;
  title: string;
  companyName: string;
}

export const LandingTitle: React.FC<Props> = ({ location, title, companyName }) => {
  return (
    <h1>
      <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
        {location}
      </span>
      <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
        <span className="block text-gray-900">{title}</span>
        <span className="block text-sky-500">{companyName}</span>
      </span>
    </h1>
  );
};
