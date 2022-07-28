import { CollectionIcon } from '@heroicons/react/outline';

interface Props {
  text: string;
}
export const MatchDatePlaceholder: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <CollectionIcon className="w-14 h-14 mb-4 text-gray-400" />
      <span className="text-md text-gray-400 font-medium">{text}</span>
    </div>
  );
};
