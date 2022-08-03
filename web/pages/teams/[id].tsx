import { useContext, useRef, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { authorizedRoute, LoadingWrapper, NotificationAlert, Title } from '@components';
import { AppContext, UserContext } from '@contexts';
import { RoleEnum } from '@enums';
import { useFileUpload, useNotification, useMultiSelect } from '@hooks';
import { Team, UpdateTeamModel, User } from '@models';
import { EditTeamForm } from '@features';

interface FormValues {
  name: string;
  description?: string;
}

interface PageProps {
  teamId: number;
}

const TeamPage: NextPage<PageProps> = (props) => {
  const { t } = useTranslation(['pages', 'common']);
  const { setTeams, teamService } = useContext(AppContext);
  const { userService } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAddRequest, setLoadingAddRequest] = useState<boolean>(false);
  const notificationHandler = useNotification();
  const [team, setTeam] = useState<Team | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const selectOwners = useMultiSelect(userService.getFilteredUsers);
  const selectPlayers = useMultiSelect(userService.getFilteredUsers);
  const fileUpload = useFileUpload(teamService.uploadLogo, inputFileRef);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoadingAddRequest(true);
    const body: UpdateTeamModel = {
      name: data.name,
      description: data.description,
      logo: fileUpload.uploadedImage ? fileUpload.uploadedImage : team?.logo,
      ownerIds: selectOwners.selectedItems.map((owner: User) => owner.id),
      playerIds: selectPlayers.selectedItems.map((player: User) => player.id),
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
      setTeams((current) => {
        if (current)
          return current.map((team) => {
            if (team.id === updateTeamResult.id) {
              return updateTeamResult;
            } else return team;
          });
      });
      fileUpload.setUploadedImage(undefined);
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
    selectOwners.setItems(users);
    selectOwners.setFilteredItems(users);
    selectPlayers.setItems(users);
    selectPlayers.setFilteredItems(users);
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
    selectOwners.setSelectedItems(team?.owners);
    selectPlayers.setSelectedItems(team?.players);
  }, [team]);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('team.title')} subtitle={t('team.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <div
            onClick={() => {
              selectOwners.handleFocus();
              selectPlayers.handleFocus();
            }}
            className="p-8 mt-4 sm:px-10 border border-slate-200 shadow-md rounded-lg"
          >
            <EditTeamForm
              loadingSubmit={loadingAddRequest}
              submit={onSubmit}
              team={team}
              selectOwners={selectOwners}
              selectPlayers={selectPlayers}
              {...fileUpload}
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
