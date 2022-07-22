import { useState, useEffect, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { DotsDivider, LoadingWrapper } from '@components';
import { AppContext, AuthContext } from '@contexts';
import { RoleEnum } from '@enums';
import { PositionsTable } from '@features';
import { Tournament } from '@models';

interface PageProps {
  tournamentId: number;
}

const Tournament: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('pages');
  const [loading, setLoading] = useState(true);
  const { tournamentService } = useContext(AppContext);
  const { authService } = useContext(AuthContext);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const isAdmin = authService.userHasRole(RoleEnum.Admin);

  const getTournament = async (id: number) => {
    setTournament(await tournamentService.getTournament(id));
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      getTournament(Number(props.tournamentId));
    }
  }, []);

  useEffect(() => {
    getTournament(Number(props.tournamentId));
  }, [props.tournamentId]);

  return (
    <LoadingWrapper loading={loading}>
      <div className="bg-white h-full w-screen p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="lg:text-center">
            <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase">{tournament?.name}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{t('tournament.subtitle')}</p>
          </div>
          <DotsDivider />
          <PositionsTable
            tournamentId={props.tournamentId}
            isAdmin={isAdmin}
            tournamentTeamScore={tournament?.tournamentTeamScore}
          />
          <p className="my-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">{t('tournament.positions.tableUpdate')}</p>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      tournamentId: context.params?.tournament,
      ...(await serverSideTranslations(context.locale || 'es', ['common', 'pages'])),
    },
  };
};

export default Tournament;
