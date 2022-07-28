import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DotsDivider } from '@components';
import { MatchDate, Team, TournamentFixture } from '@models';
import { AddMatchDateBracketModal } from '../AddMatchDateBracketModal';
import { AddMatchDateModal } from '../AddMatchDateModal';
import { MatchDateList } from './MatchDateList';

interface Props {
  teams?: Team[];
  fixtureProps?: TournamentFixture;
}

export const FixtureGrid: React.FC<Props> = ({ fixtureProps, teams }) => {
  const { t, i18n } = useTranslation('pages');
  const [fixture, setFixture] = useState(fixtureProps);
  const [addMatchDateModalOpen, setAddMatchDateModalOpen] = useState(false);
  const [addMatchDateBracketModalOpen, setAddMatchDateBracketModalOpen] = useState(false);
  const [currentMatchDate, setCurrentMatchDate] = useState<number>();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase mt-4">
        {t('tournament.fixture.title')}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">{t('tournament.fixture.subtitle')}</p>
      <DotsDivider />
      <MatchDateList
        fixture={fixture}
        onSubmit={() => setAddMatchDateModalOpen((current) => !current)}
        onAddMatch={(id?: number) => {
          setCurrentMatchDate(id);
          setAddMatchDateBracketModalOpen((current) => !current);
        }}
      />
      <AddMatchDateModal fixtureId={fixture?.id} open={addMatchDateModalOpen} setOpen={setAddMatchDateModalOpen} />
      <AddMatchDateBracketModal
        fixtureId={fixture?.id}
        matchDateId={currentMatchDate}
        teams={teams}
        onSuccess={(modalMatchDate: MatchDate) =>
          setFixture((current) => {
            if (current) {
              return {
                ...current,
                matchDates: current?.matchDates.map((matchDate) => {
                  if (matchDate.id === modalMatchDate.id) {
                    return { ...matchDate, teamBrackets: modalMatchDate.teamBrackets };
                  }
                  return matchDate;
                }),
              };
            }
          })
        }
        open={addMatchDateBracketModalOpen}
        setOpen={setAddMatchDateBracketModalOpen}
      />
    </div>
  );
};
