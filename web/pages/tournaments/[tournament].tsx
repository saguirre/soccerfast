import { useState, useEffect, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { DotsDivider, LoadingWrapper } from '@components';
import { AppContext, AuthContext } from '@contexts';
import { RoleEnum } from '@enums';
import { FixtureGrid, GoalKeepersTable, PositionsTable, TableTabs, TopScorersTable } from '@features';
import { Tournament } from '@models';

interface PageProps {
  tournamentId: number;
}

const Tournament: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('pages');
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('positions');
  const { tournamentService } = useContext(AppContext);
  const { authService } = useContext(AuthContext);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const isAdmin = authService.userHasRole(RoleEnum.Admin);

  const fixture = [
    {
      title: 'Primera Fecha',
      date: '30/07/2022',
      teamBrackets: [
        {
          time: '6PM',
          leftTeam: { team: tournament?.tournamentTeamScore?.[0].team, goals: 3 },
          rightTeam: { team: tournament?.tournamentTeamScore?.[1].team, goals: 2 },
        },
        {
          time: '7:30PM',
          leftTeam: { team: tournament?.tournamentTeamScore?.[2].team, goals: 2 },
          rightTeam: { team: tournament?.tournamentTeamScore?.[3].team, goals: 2 },
        },
      ],
    },
    // {
    //   title: 'Segunda Fecha',
    //   date: '31/07/2022',
    //   teamBrackets: [
    //     {
    //       time: '6PM',
    //       leftTeam: { team: tournament?.tournamentTeamScore?.[2].team, goals: 1 },
    //       rightTeam: { team: tournament?.tournamentTeamScore?.[0].team, goals: 3 },
    //     },
    //     {
    //       time: '7:30PM',
    //       leftTeam: { team: tournament?.tournamentTeamScore?.[1].team, goals: 3 },
    //       rightTeam: { team: tournament?.tournamentTeamScore?.[4].team, goals: 1 },
    //     },
    //     {
    //       time: '9PM',
    //       leftTeam: { team: tournament?.tournamentTeamScore?.[3].team, goals: 1 },
    //       rightTeam: { team: tournament?.tournamentTeamScore?.[5].team, goals: 1 },
    //     },
    //   ],
    // },
  ];

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
          <div className="w-full flex flex-col items-center px-24">
            <TableTabs
              selectedTab={(tab) => {
                console.log(tab);
                setSelectedTab(tab);
              }}
            />
            {selectedTab === 'positions' && (
              <div className="w-full px-12 py-4 flex flex-col items-center">
                <PositionsTable
                  tournamentId={props.tournamentId}
                  isAdmin={isAdmin}
                  tournamentTeamScore={tournament?.tournamentTeamScore}
                />
                <p className="my-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">
                  {t('tournament.positions.tableUpdate')}
                </p>
                <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase mt-4">Fixture</h2>
                <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                  Visualiza los resultados de partidos anteriores y los partidos que están por venir!
                </p>
                <DotsDivider />
                <FixtureGrid fixture={fixture} />
                <DotsDivider />
              </div>
            )}
            {selectedTab === 'goalKeepers' && (
              <div className="flex flex-col items-center w-full px-12 py-4">
                <div className="w-full gap-6 flex flex-row items-center justify-center">
                  <div className="w-1/2">
                    <GoalKeepersTable
                      tournamentId={props.tournamentId}
                      isAdmin={isAdmin}
                      tournamentTeamScore={tournament?.tournamentTeamScore}
                    />
                  </div>
                </div>
                <p className="my-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">
                  {t('tournament.positions.tableUpdate')}
                </p>
              </div>
            )}
            {selectedTab === 'topScorers' && (
              <div className="w-full px-12 py-4 flex flex-row items-center justify-center">
                <div className="w-1/2">
                  <TopScorersTable
                    tournamentId={props.tournamentId}
                    isAdmin={isAdmin}
                    tournamentTeamScore={tournament?.tournamentTeamScore}
                  />
                </div>
              </div>
            )}
          </div>
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
