import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { TeamScore } from '@models';
import { AppContext } from 'contexts/app.context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

interface PositionsTableProps {
  isAdmin?: boolean;
  tournamentId: number;
  tournamentTeamScore: TeamScore[] | undefined;
}

export interface PositionsTableItem {
  id: number;
  name: string;
  logo: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesTied: number;
  matchesLost: number;
  goalsAhead: number;
  goalsAgainst: number;
  points: number;
  editable?: boolean;
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ isAdmin, tournamentId, tournamentTeamScore }) => {
  const router = useRouter();
  const { tournamentService } = useContext(AppContext);

  const getGoalDiff = (teamScore: PositionsTableItem) => {
    return teamScore.goalsAhead - teamScore.goalsAgainst;
  };

  const mapTeams = () => {
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
      .sort((t1: PositionsTableItem, t2: PositionsTableItem) => {
        if (t2.points === t1.points) {
          const t2GoalDiff = getGoalDiff(t2);
          const t1GoalDiff = getGoalDiff(t1);
          return t2GoalDiff - t1GoalDiff;
        }
        return t2.points - t1.points;
      });
  };

  const editRow = async (row: PositionsTableItem) => {
    console.log(row);
  };

  const [teams, setTeams] = useState<PositionsTableItem[] | undefined>(mapTeams);

  const handleEdit = (id: number, editable: boolean) => {
    setTeams((currentTeams) => {
      return currentTeams?.map((team: PositionsTableItem) => {
        if (team.id === id) {
          return { ...team, editable };
        }
        return team;
      });
    });
  };

  const goToEditTournament = () => {
    router.push({
      pathname: `/tournaments/edit/${tournamentId}`,
    });
  };

  return (
    <div className="w-full px-24">
      <div className="flex flex-row justify-between items-center">
        <div className="mt-6 flex flex-col justify-justify-center items-start w-full">
          <h1 className="text-xl font-semibold text-slate-900">Tabla de posiciones</h1>
          <p className="mt-2 text-sm text-gray-700">Visualiza las posiciones y puntos hasta la fecha.</p>
        </div>
        <button
          onClick={goToEditTournament}
          className="w-48 h-10 bg-white hover:ring-2 hover:ring-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg py-1 px-2 mr-3"
        >
          <span className="text-sky-500">Editar Torneo</span>
        </button>
        <button className="w-48 h-10 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-lg py-1 px-2">
          <span className="text-white">Agregar Equipo</span>
        </button>
      </div>
      <div className="mt-4  flex w-full flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Equipos
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      PJ
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      PG
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      PE
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      PP
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      GAF
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      GE
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                      PTS
                    </th>
                    {isAdmin && (
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {teams?.map((team, index: number) => (
                    <tr key={team.name}>
                      <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={team.logo} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-base text-gray-900">{team.name}</div>
                            {/* <div className="text-gray-500">Alguna descripción...</div> */}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.matchesPlayed}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.matchesPlayed}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.matchesWon}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.matchesWon}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.matchesTied}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.matchesTied}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.matchesLost}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.matchesLost}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.goalsAhead}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.goalsAhead}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.goalsAgainst}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.goalsAhead}
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 text-center py-4 text-sm text-gray-500">
                        {!team.editable ? (
                          <span>{team.points}</span>
                        ) : (
                          <input
                            className="w-1/4 text-end border border-gray-300 rounded-md shadow-sm px-2 py-1"
                            defaultValue={team.points}
                          />
                        )}
                      </td>
                      {isAdmin && (
                        <td className="flex flex-row justify-end items-center relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6">
                          {!team.editable ? (
                            <div
                              className="w-fit px-2 py-1 text-sky-600 hover:cursor-pointer hover:ring-2 rounded-md hover:ring-sky-600"
                              onClick={() => handleEdit(team.id, true)}
                            >
                              Editar<span className="sr-only">Edit</span>
                            </div>
                          ) : (
                            <div className="flex flex-row justify-end items-center">
                              <button
                                onClick={() => handleEdit(team.id, false)}
                                className="mr-4 p-0.5 rounded-full hover:ring-2 hover:ring-red-500"
                              >
                                <XIcon className="h-6 w-6 text-red-400" />
                              </button>
                              <button className=" p-0.5 rounded-full hover:ring-2 hover:ring-green-500">
                                <CheckIcon className="h-6 w-6 text-green-500" />
                              </button>
                            </div>
                          )}
                        </td>
                      )}
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
