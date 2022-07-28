import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { authorizedRoute, LoadingWrapper, Title } from '@components';
import { UserContext } from '@contexts';
import { RoleEnum } from '@enums';
import { User } from '@models';
import { AddTeamForm } from 'features/teams';

const AddTeamPage: NextPage = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { userService } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllUsers = async () => {
    const users = await userService.getUsers();
    if (!users?.length) {
      return;
    }
    setUsers(users);
  };

  useEffect(() => {
    getAllUsers();
    setLoading(false);
  }, []);

  return (
    <div className="h-full w-full bg-white flex flex-col justify-center pt-4 pb-20 sm:px-6 lg:px-8">
      <Title title={t('pages:addTeam.title')} subtitle={t('pages:addTeam.subtitle')} />
      <LoadingWrapper loading={loading}>
        <div className="sm:mx-auto max-w-2xl">
          <AddTeamForm users={users} />
        </div>
      </LoadingWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || 'es', ['common', 'pages'])) },
  };
};

export default authorizedRoute(AddTeamPage, RoleEnum.Admin);
