import dynamic from 'next/dynamic';

interface Props {
  logo: string;
}

export const LogoComponent: React.FC<Props> = ({ logo }) => {
  const logoObject: { [key: string]: any } = {
    facebook: dynamic(() => import('../Logos/FacebookLogo').then((mod) => mod.FacebookLogoComponent) as any, {
      ssr: false,
    }),
    instagram: dynamic(() => import('../Logos/InstagramLogo').then((mod) => mod.InstagramLogoComponent) as any, {
      ssr: false,
    }),
    twitter: dynamic(() => import('../Logos/TwitterLogo').then((mod) => mod.TwitterLogoComponent) as any, {
      ssr: false,
    }),
  };
  const LogoObject = logoObject[logo];
  return <LogoObject />;
};
