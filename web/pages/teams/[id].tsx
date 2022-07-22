import { ChangeEvent, MouseEvent, useContext, useRef, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { authorizedRoute, LoadingWrapper, FormMultiSelect, NotificationAlert, SubmitButton, Title } from '@components';
import { AppContext, UserContext } from '@contexts';
import { RoleEnum } from '@enums';
import { useFileUpload, useNotification, useSelect } from '@hooks';
import { Team, UpdateTeamModel, User } from '@models';
import { TeamForm } from 'features/teams';

interface FormValues {
  name: string;
  description?: string;
}

interface PageProps {
  teamId: number;
}

const TeamPage: NextPage<PageProps> = (props) => {
  const { t } = useTranslation(['pages', 'common']);
  const { teamService } = useContext(AppContext);
  const { userService } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const notificationHandler = useNotification();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const select = useSelect(userService.getFilteredUsers);
  const fileUpload = useFileUpload(teamService.uploadLogo);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: UpdateTeamModel = {
      name: data.name,
      description: data.description,
      logo: fileUpload.newlyUploadedLogo ? fileUpload.newlyUploadedLogo : team?.logo,
      ownerId: select.selectedItems[0].id,
    };

    if (team?.id) {
      const updateTeamResult = await teamService.updateTeam(team?.id, body);
      setLoadingAddRequest(false);
      if (!updateTeamResult) {
        notificationHandler.createNotification({
          title: t('common:notification.updateErrorTitle'),
          message: t('common:notification.updateErrorMessage', { entity: body.name }),
          isError: true,
        });
        return;
      }
      setTeam(updateTeamResult);
      fileUpload.setNewlyUploadedLogo(null);
      notificationHandler.createNotification({
        title: t('common:notification.updateSuccessTitle', { entity: t('common:entity.team') }),
        message: t('common:notification.updateSuccessMessage', { entity: body.name }),
      });
    }
  };

  const getAllUsers = async () => {
    const users = await userService.getUsers();
    if (!users?.length) {
      return;
    }
    select.setItems(users);
    select.setFilteredItems(users);
  };

  const openFileExplorer = () => {
    inputFileRef?.current?.click();
  };

  const getTeam = async () => {
    setTeam(await teamService.getTeam(Number(props.teamId)));
  };

  useEffect(() => {
    axios.all([getAllUsers(), getTeam()]);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTeam();
    setLoading(false);
  }, [props.teamId]);

  useEffect(() => {
    const owner = select.items?.find((user: User) => user.id === team?.ownerId);
    if (owner) select.setSelectedItems([owner]);
  }, [team]);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('team.title')} subtitle={t('team.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div onClick={select.handleFocus} className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg">
            <TeamForm
              inputFileRef={inputFileRef}
              loadingSubmit={loadingAddRequest}
              submit={onSubmit}
              team={team}
              openFileExplorer={openFileExplorer}
              {...select}
              {...fileUpload}
              items={select.filteredItems}
            />
          </div>
          <NotificationAlert {...notificationHandler}></NotificationAlert>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  return { props: { teamId: params?.id, ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) } };
};

export default authorizedRoute(TeamPage, RoleEnum.Admin);
