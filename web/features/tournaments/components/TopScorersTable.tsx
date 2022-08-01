import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { TournamentContext } from '@contexts';
import { TeamScore } from '@models';

interface TopScorersProps {
  isAdmin?: boolean;
}

export interface TopScorersItem {
  [key: string]: number | string | boolean;
}

export const TopScorersTable: React.FC<TopScorersProps> = () => {
  const { t } = useTranslation('pages');
  const { tournament } = useContext(TournamentContext);
  const tableHeaders = ['player', 'goals'];

  const getGoalDiff = (teamScore: TopScorersItem) => {
    return (teamScore.goalsAhead as number) - (teamScore.goalsAgainst as number);
  };

  const mapTeams = () => {
    return tournament?.tournamentTeamScore
      ?.map((score: TeamScore) => {
        return {
          id: score.teamId,
          name: score.team.name,
          logo: score.team.logo,
          matchesPlayed: score.matchesPlayed,
          matchesWon: score.matchesWon,
          matchesTied: score.matchesTied,
          matchesLost: score.matchesLost,
          goalsAhead: score.goalsAhead,
          goalsAgainst: score.goalsAgainst,
          points: score.points,
        };
      })
      .sort((t1: TopScorersItem, t2: TopScorersItem) => {
        if (t2.points === t1.points) {
          const t2GoalDiff = getGoalDiff(t2);
          const t1GoalDiff = getGoalDiff(t1);
          return t2GoalDiff - t1GoalDiff;
        }
        return (t2.points as number) - (t1.points as number);
      });
  };

  const [teams, setTeams] = useState<TopScorersItem[] | undefined>(mapTeams);

  useEffect(() => {
    setTeams(mapTeams());
  }, [tournament?.tournamentTeamScore]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="mt-6 flex flex-col justify-justify-center items-start w-full">
          <h1 className="text-xl font-semibold text-slate-900">{t('tournament.topScorers.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">{t('tournament.topScorers.subtitle')}</p>
        </div>
      </div>
      <div className="mt-4  flex w-full flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('tournament.positions.teams')}
                    </th>
                    {tableHeaders.map((header: string) => (
                      <th
                        key={header}
                        scope="col"
                        className="text-center py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-2"
                      >
                        {t(`tournament.topScorers.${header}`)}
                      </th>
                    ))}
                    <th className="px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {teams?.map((team, index: number) => (
                    <tr key={team.name as string}>
                      <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm pl-2">
                        <div className="flex items-center">
                          <div className="w-14 flex justify-center flex-shrink-0">
                            <img className="h-12 aspect-square rounded-sm" src={team.logo as string} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-base text-gray-900">{team.name}</div>
                            {/* <div className="text-gray-500">Alguna descripción...</div> */}
                          </div>
                        </div>
                      </td>
                      {tableHeaders.map((header: string) => (
                        <td
                          key={`${(team?.name as string)?.toLocaleLowerCase()}-${header?.toLowerCase()}`}
                          className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500"
                        >
                          <span>{team[header]}</span>
                        </td>
                      ))}
                      <td className="px-4"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
