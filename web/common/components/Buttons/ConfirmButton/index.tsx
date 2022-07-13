interface ConfirmButtonProps {
  message: string;
  onClick?: () => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ message, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-1/2 text-white bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {message}
    </button>
  );
};
