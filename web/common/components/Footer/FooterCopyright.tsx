interface Props {
  copyright: string;
}

export const FooterCopyright: React.FC<Props> = ({ copyright }) => (
  <p className="text-base text-gray-400 xl:text-center">&copy; {copyright}</p>
);
