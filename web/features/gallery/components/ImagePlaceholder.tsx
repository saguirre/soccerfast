import { PhotographIcon } from '@heroicons/react/outline';

interface Props {
  text: string;
}
export const ImagePlaceholder: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PhotographIcon className="w-16 mb-4 text-gray-300" />
      <span className="text-md text-gray-400 font-medium">{text}</span>
    </div>
  );
};
