import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { TeamImageGallery } from '@features';
import { Title } from '@components';
import { AppContext } from 'contexts/app.context';
import { useState } from 'react';
import { Team } from '@models/*';

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
  const teamId = router.query.team as string;
  const { teamService } = useContext(AppContext);
  const { t } = useTranslation('pages');
  const [team, setTeam] = useState<Team | null>(null);
  const getTeam = async () => {
    setTeam(await teamService.getTeam(Number(teamId)));
  };

  useEffect(() => {
    if (router.isReady) {
      getTeam();
    }
  }, [teamId]);

  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title={t('teamPhotos.title')} subtitle={t('teamPhotos.subtitle', { team: team?.name })} />
      </div>
      <div className="p-8">
        <TeamImageGallery images={images} />;
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default ImageGalleryPage;
