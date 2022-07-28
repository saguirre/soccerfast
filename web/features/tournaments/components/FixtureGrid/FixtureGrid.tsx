import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DotsDivider, NotificationAlert } from '@components';
import { MatchDate, Notification, Team, TournamentFixture } from '@models';
import { AddMatchDateBracketModal } from '../AddMatchDateBracketModal';
import { AddMatchDateModal } from '../AddMatchDateModal';
import { MatchDateList } from './MatchDateList';
import { useNotification } from 'hooks/useNotification.hook';

interface Props {
  teams?: Team[];
  fixtureProps?: TournamentFixture;
}

export const FixtureGrid: React.FC<Props> = ({ fixtureProps, teams }) => {
  const { t } = useTranslation('pages');
  const [fixture, setFixture] = useState(fixtureProps);
  const [addMatchDateModalOpen, setAddMatchDateModalOpen] = useState(false);
  const [addMatchDateBracketModalOpen, setAddMatchDateBracketModalOpen] = useState(false);
  const [currentMatchDate, setCurrentMatchDate] = useState<number>();
  const notification = useNotification();

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
      <AddMatchDateModal
        fixtureId={fixture?.id}
        open={addMatchDateModalOpen}
        setOpen={setAddMatchDateModalOpen}
        onSuccess={(matchDate: MatchDate) => {
          setFixture((current) => {
            if (current) {
              return {
                ...current,
                matchDates: [...current.matchDates, matchDate],
              };
            }
          });
          notification.createNotification({
            title: t('common:notification.addSuccessTitle', { entity: t('common:entity.matchDate') }),
            message: t('common:notification.addSuccessMessage', { entity: t('common:entity.matchDate') }),
          });
        }}
        onError={(modalNotification: Notification) => notification.createNotification(modalNotification)}
      />
      <AddMatchDateBracketModal
        fixtureId={fixture?.id}
        matchDateId={currentMatchDate}
        teams={teams}
        onSuccess={(modalMatchDate: MatchDate) => {
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
          });
          notification.createNotification({
            title: t('common:notification.addSuccessTitle', { entity: t('common:entity.teamBracket') }),
            message: t('common:notification.addSuccessMessage', { entity: t('common:entity.teamBracket') }),
          });
        }}
        onError={(modalNotification: Notification) => notification.createNotification(modalNotification)}
        open={addMatchDateBracketModalOpen}
        setOpen={setAddMatchDateBracketModalOpen}
      />
      <NotificationAlert {...notification} />
    </div>
  );
};
