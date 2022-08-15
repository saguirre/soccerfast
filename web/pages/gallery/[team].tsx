import { useContext, useEffect, useRef } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { TeamImageGallery } from '@features';
import { AddButton, ConfirmButton, Title } from '@components';
import { AppContext } from 'contexts/app.context';
import { useState } from 'react';
import { Team } from '@models/*';
import { useFileUpload } from 'hooks/useFileUpload.hook';

const ImageGalleryPage: NextPage = () => {
  const router = useRouter();
  const teamId = router.query.team as string;
  const { teamService } = useContext(AppContext);
  const { t } = useTranslation('pages');
  const [team, setTeam] = useState<Team | null>(null);
  const [images, setImages] = useState<string[] | undefined>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const imageUpload = useFileUpload(teamService.uploadImage, inputFileRef, Number(teamId));
  const getTeam = async () => {
    setTeam(await teamService.getTeam(Number(teamId)));
  };

  useEffect(() => {
    if (router.isReady) {
      getTeam();
    }
  }, [teamId]);

  const getTeamImages = async () => {
    setImages(await teamService.getTeamImages(Number(teamId)));
  };

  useEffect(() => {
    getTeamImages();
  }, [imageUpload.uploadedImage]);

  return (
    <div className="h-full bg-white py-8">
      <div className="flex flex-col items-center justify-center">
        <Title title={t('teamPhotos.title')} subtitle={t('teamPhotos.subtitle', { team: team?.name })} />
      </div>
      <div className="flex flex-row justify-end items-center w-full">
        <AddButton
          text={t('teamPhotos.add')}
          className="w-1/6 px-8 py-3 mr-12"
          loading={imageUpload.loadingImageUpload}
          onClick={imageUpload.openFileExplorer}
        />
        <input
          ref={inputFileRef}
          className="hidden"
          type="file"
          name="image"
          id="file"
          onChange={(e) => imageUpload.handleSetImage(e)}
        />
      </div>
      <div className="p-8">
        <TeamImageGallery images={images} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default ImageGalleryPage;
