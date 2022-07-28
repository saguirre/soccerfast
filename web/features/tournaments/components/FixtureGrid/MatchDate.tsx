import { useTranslation } from 'next-i18next';

import { MatchDate } from '@models';
import { getLastDigit, getLastTwoDigits, getOrdinalNumberSuffix } from '@utils';
import { MatchDateBracketContainer } from './MatchDateBracketContainer';

interface Props {
  matchDateKey: any;
  index: number;
  matchDate?: MatchDate;
  onAddMatch: (id?: number) => void;
}
export const MatchDateComponent: React.FC<Props> = ({ matchDateKey, index, matchDate, onAddMatch }) => {
  const { t, i18n } = useTranslation('pages');
  return (
    <div key={matchDateKey} className="flex flex-col justify-center w-full my-4">
      <span className="mb-4 text-lg text-center text-sky-600">
        {t('tournament.fixture.matchTitle', {
          number: `${index + 1}${getOrdinalNumberSuffix(
            i18n.language,
            getLastDigit(index + 1),
            getLastTwoDigits(index + 1)
          )}`,
        })}
      </span>
      <MatchDateBracketContainer
        bracketKey={index}
        matchDate={matchDate}
        onAddMatch={(id?: number) => onAddMatch(id)}
      />
    </div>
  );
};
