interface Props {
  title: string;
}

export const ContactInformationTitle: React.FC<Props> = ({ title }) => (
  <h3 className="text-lg font-medium text-white">{title}</h3>
);
