interface Props {
  text: string;
}

export const FormTitle: React.FC<Props> = ({ text }) => <p className="text-base font-medium text-gray-900">{text}</p>;
