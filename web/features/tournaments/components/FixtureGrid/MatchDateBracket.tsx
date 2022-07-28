import { MatchDate, MatchDateBracket } from '@models';

interface Props {
  matchDateBracketKey: number;
  matchDate?: MatchDate;
  bracket?: MatchDateBracket;
}

export const MatchDateBracketComponent: React.FC<Props> = ({ matchDateBracketKey, matchDate, bracket }) => {
  return (
    <div
      key={matchDateBracketKey}
      className="flex flex-col items-center justify-center shadow-md rounded-lg bg-white border border-gray-200 pt-4 pb-5 px-3"
    >
      {matchDate?.date ? (
        <span className="text-center text-sm text-gray-400 pb-2">
          {matchDate?.date} {`${bracket?.time ? '- ' + bracket?.time : ''}`}
        </span>
      ) : (
        <span className="text-center text-sm text-gray-400 pb-2">vs</span>
      )}
      <div className="flex flex-row items-center justify-center pt-1 pb-2">
        <div className="flex flex-row gap-3 items-center justify-start">
          <span className="px-2">{bracket?.firstTeam?.team?.name}</span>
          <img className="h-12 aspect-square" src={bracket?.firstTeam?.team?.logo} />
        </div>
        <div className="flex flex-row gap-2 text-semibold text-lg text-center px-12">
          <span>{bracket?.firstTeam?.goals}</span> - <span>{bracket?.secondTeam?.goals}</span>
        </div>
        <div className="flex flex-row gap-3 items-center justify-end">
          <img className="h-12 aspect-square" src={bracket?.secondTeam?.team?.logo} />
          <span className="px-2">{bracket?.secondTeam?.team?.name}</span>
        </div>
      </div>
    </div>
  );
};
