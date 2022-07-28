interface Props {
  text: string;
}

export const FormTitle: React.FC<Props> = ({ text }) => <p className="text-base text-center sm:text-start font-medium text-gray-900">{text}</p>;
