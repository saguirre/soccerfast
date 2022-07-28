import { MatchDate } from '@models';
import { useTranslation } from 'next-i18next';
import { MatchDateBracketComponent } from './MatchDateBracket';
import { MatchDatePlaceholder } from './MatchDatePlaceholder';

interface Props {
  bracketKey: any;
  onAddMatch: (matchDateId?: number) => void;
  matchDate?: MatchDate;
}

export const MatchDateBracketContainer: React.FC<Props> = ({ bracketKey, matchDate, onAddMatch }) => {
  const { t } = useTranslation('pages');
  return (
    <div>
      <button
        onClick={() => onAddMatch(matchDate?.id)}
        className="flex flex-row py-3 px-4 mt-2 mb-6 items-center w-fit justify-end rounded-lg text-white bg-sky-500 hover:bg-sky-600 active:ring-2 active:ring-sky-300 "
      >
        {t('tournament.fixture.addMatch')}
      </button>
      <div key={bracketKey} className="flex flex-col items-center justify-center">
        {matchDate?.teamBrackets && matchDate?.teamBrackets?.length > 0 ? (
          <div className="grid grid-cols-3 gap-y-6 gap-x-8 w-full mb-6">
            {matchDate.teamBrackets?.map((bracket, index) => (
              <MatchDateBracketComponent key={index} matchDateBracketKey={index} matchDate={matchDate} bracket={bracket} />
            ))}
          </div>
        ) : (
          <MatchDatePlaceholder text={t('tournament.fixture.noBrackets')} />
        )}
      </div>
    </div>
  );
};
