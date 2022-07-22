interface Props {
  companyName: string;
  textBlockOne: string;
  textBlockTwo?: string;
}

export const LandingIntro: React.FC<Props> = ({ textBlockOne, textBlockTwo, companyName }) => {
  return (
    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
      <span className="font-semibold text-sky-500">{companyName} </span>
      {textBlockOne} <br /> <br />
      {textBlockTwo}
    </p>
  );
};
