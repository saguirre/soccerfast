interface Props {
  subtitle: string;
}

export const ContactInformationSubtitle: React.FC<Props> = ({ subtitle }) => (
  <p className="mt-6 text-base text-white max-w-3xl">{subtitle}</p>
);
