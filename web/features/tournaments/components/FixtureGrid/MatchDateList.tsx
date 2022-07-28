import { useTranslation } from 'next-i18next';

import { SubmitButton } from '@components';
import { TournamentFixture } from '@models';
import { MatchDateComponent } from './MatchDate';
import { MatchDatePlaceholder } from './MatchDatePlaceholder';

interface Props {
  onSubmit: () => void;
  onAddMatch: (id?: number) => void;
  fixture?: TournamentFixture;
}
export const MatchDateList: React.FC<Props> = ({ fixture, onAddMatch, onSubmit }) => {
  const { t } = useTranslation('pages');
  return (
    <div className='w-full'>
      <div className="w-full flex flex-row justify-end items-center">
        <SubmitButton onClick={onSubmit} className="w-1/6" text={t('tournament.fixture.addMatchDate')} />
      </div>
      {fixture?.matchDates && fixture?.matchDates?.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-6">
          {fixture?.matchDates?.map((matchDate, index) => (
            <MatchDateComponent
              index={index}
              key={index}
              matchDate={matchDate}
              onAddMatch={(id?: number) => onAddMatch(id)}
            />
          ))}
        </div>
      ) : (
        <div className="my-4">
          <MatchDatePlaceholder text={t('tournament.fixture.noMatchDates')} />
        </div>
      )}
    </div>
  );
};
