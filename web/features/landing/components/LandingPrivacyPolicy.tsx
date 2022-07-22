import Link from 'next/link';

interface Props {
  prependText: string;
  privacyPolicy: string;
}

export const LandingPrivacyPolicy: React.FC<Props> = ({ prependText, privacyPolicy }) => {
  return (
    <p className="mt-3 text-sm text-gray-500">
      {prependText}
      <Link href="/privacy-policy">
        <span className="font-medium ml-0.5 text-black underline hover:cursor-pointer hover:text-slate-600">
          {privacyPolicy}
        </span>
      </Link>
    </p>
  );
};
