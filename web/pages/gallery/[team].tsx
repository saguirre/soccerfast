import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { ImageGallery, Title } from '@components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const images = [
  '/escudo-furiosos.png',
  '/escudo-monterrey.png',
  '/escudo-racing.png',
  '/escudo-rio-de-la-plata.png',
  '/luis-campeon.jpeg',
  '/escudo-cerro.png',
  '/escudo-beach-city.png',
];

const ImageGalleryPage: NextPage = () => {
  const router = useRouter();
  const team = router.query.team as string;
  const { t } = useTranslation('pages');

  useEffect(() => {
    if (router.isReady) {
    }
  }, []);

  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title={t('teamPhotos.title')} subtitle={t('teamPhotos.subtitle', { team })} />
      </div>
      <div className="p-8">
        <ImageGallery images={images} />;
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default ImageGalleryPage;
