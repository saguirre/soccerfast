import { XIcon } from "@heroicons/react/outline";

interface ModalCloseButtonProps {
  onClick: () => void;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    >
      <XIcon className="w-5 h-5 text-slate-900"></XIcon>
    </button>
  );
};
