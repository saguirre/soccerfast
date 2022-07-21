import { GetServerSideProps, NextPage } from 'next';

import { TeamGallery, Title } from '@components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const TeamGalleryPage: NextPage = () => {
  const { t } = useTranslation('pages');
  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      </div>
      <div className="p-8">
        <TeamGallery />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default TeamGalleryPage;
