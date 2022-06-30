import { DotsDivider } from "../DotsDivider";

interface TitleProps {
  title: string;
  subtitle?: string;
}

export const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className="lg:text-center mt-8">
      <h2 className="text-base text-sky-500 font-semibold tracking-wide uppercase">{title}</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{subtitle}</p>
      <DotsDivider />
    </div>
  );
};
