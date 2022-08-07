import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { TeamScore } from '@models';
import { TournamentContext } from 'contexts/tournament.context';

interface GoalKeepersProps {}

export interface GoalKeepersItem {
  [key: string]: number | string | boolean;
}

const mapTeams = (tournamentTeamScore: TeamScore[] | undefined) => {
  return tournamentTeamScore
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
    .sort((t1: GoalKeepersItem, t2: GoalKeepersItem) => {
      return (t1.goalsAgainst as number) - (t2.goalsAgainst as number);
    });
};

export const GoalKeepersTable: React.FC<GoalKeepersProps> = () => {
  const { t } = useTranslation('pages');
  const { tournament } = useContext(TournamentContext);
  const tableHeaders = ['goalsAgainst'];
  const mappedTeams = mapTeams(tournament?.tournamentTeamScores);
  const [teams, setTeams] = useState<GoalKeepersItem[] | undefined>(mappedTeams);

  useEffect(() => {
    setTeams(mapTeams(tournament?.tournamentTeamScores));
  }, [tournament?.tournamentTeamScores]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="mt-6 flex flex-col justify-justify-center items-start w-full">
          <h1 className="text-xl font-semibold text-slate-900">{t('tournament.goalKeepers.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">{t('tournament.goalKeepers.subtitle')}</p>
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
                        {t(`tournament.goalKeepers.${header}`)}
                      </th>
                    ))}
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
