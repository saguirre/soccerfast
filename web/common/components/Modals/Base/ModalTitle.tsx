interface ModalTitleProps {
  text: string;
}

export const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => {
  return <h3 className="text-xl font-medium pl-2 text-gray-900">{text}</h3>;
};
