interface Props {
  message?: string;
  onClick?: () => void;
}

export const CancelButton: React.FC<Props> = ({ message, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-1/4 mr-2 text-sky-300 bg-white hover:bg-sky-50 focus:ring-4 focus:outline-none focus:ring-sky-200 rounded-lg border border-sky-200 text-sm font-medium px-5 py-2 hover:text-sky-400"
    >
      {message}
    </button>
  );
};
