import { TournamentFixture } from '@models';

interface Props {
  fixture: TournamentFixture[];
}

export const FixtureGrid: React.FC<Props> = ({ fixture }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      {fixture?.map((tournamentFixture, index) => (
        <div key={index} className="flex flex-col justify-center w-full">
          <span className="mb-4 text-lg text-center text-sky-600">{tournamentFixture.title}</span>
          <div key={index} className="grid grid-cols-3 gap-y-6 gap-x-8 w-full mb-6">
            {tournamentFixture.teamBrackets?.map((bracket, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center shadow-md rounded-lg bg-white border border-gray-200 pt-4 pb-5 px-3"
              >
                <span className="text-center text-sm text-gray-400 pb-2">
                  {tournamentFixture?.date} - {bracket.time}
                </span>
                <div className="flex flex-row items-center justify-center pt-1 pb-2">
                  <div className="flex flex-row gap-3 items-center justify-start">
                    <span className="px-2">{bracket.leftTeam.team?.name}</span>
                    <img className="h-12 aspect-square" src={bracket.leftTeam.team?.logo} />
                  </div>
                  <div className="text-semibold text-lg text-center px-12">
                    {bracket.leftTeam.goals} - {bracket.rightTeam.goals}
                  </div>
                  <div className="flex flex-row gap-3 items-center justify-end">
                    <img className="h-12 aspect-square" src={bracket.rightTeam.team?.logo} />
                    <span className="px-2">{bracket.rightTeam.team?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
