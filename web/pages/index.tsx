import { NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  LandingDottedBackground,
  LandingMailingListSubscribe,
  LandingTitle,
  LandingIntro,
  LandingImage,
} from '@features';

const Home: NextPage = () => {
  const { t } = useTranslation('pages');
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <LandingDottedBackground />
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-16 sm:px-6 lg:mt-20">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <LandingTitle location="Miami, Florida" title={t('landing.titleBlack')} companyName="SoccerFast" />
                <LandingIntro
                  companyName="SoccerFast"
                  textBlockOne={t('landing.intro')}
                  textBlockTwo={t('landing.intro2')}
                />
                <LandingMailingListSubscribe />
              </div>
              <LandingImage />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])),
  },
});

export default Home;
