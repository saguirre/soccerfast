import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { DotsDivider, NotificationAlert } from '@components';
import { MatchDate, MatchDateBracket, Notification, Team, Tournament, TournamentFixture } from '@models';
import { AddMatchDateBracketModal } from '../AddMatchDateBracketModal';
import { AddMatchDateModal } from '../AddMatchDateModal';
import { MatchDateList } from './MatchDateList';
import { useNotification } from 'hooks/useNotification.hook';
import { TournamentContext } from 'contexts/tournament.context';
import { AppContext } from 'contexts/app.context';

interface Props {}

export const FixtureGrid: React.FC<Props> = () => {
  const { t } = useTranslation('pages');
  const { tournament, setTournament } = useContext(TournamentContext);
  const { tournamentService } = useContext(AppContext);
  const [addMatchDateModalOpen, setAddMatchDateModalOpen] = useState(false);
  const [tournamentMatchDates, setTournamentMatchDates] = useState<MatchDate[]>();
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
        tournamentMatchDates={tournament?.tournamentMatchDates}
        onSubmit={() => setAddMatchDateModalOpen((current) => !current)}
        onAddMatch={(id?: number) => {
          setCurrentMatchDate(id);
          setAddMatchDateBracketModalOpen((current) => !current);
        }}
      />
      <AddMatchDateModal
        tournamentId={tournament?.id}
        open={addMatchDateModalOpen}
        setOpen={setAddMatchDateModalOpen}
        onSuccess={async (matchDate: MatchDate) => {
          if (tournament?.id && setTournament) {
            setTournament(await tournamentService.getTournament(tournament?.id));
            notification.createNotification({
              title: t('common:notification.addSuccessTitle', { entity: t('common:entity.matchDate') }),
              message: t('common:notification.addSuccessMessage', { entity: t('common:entity.matchDate') }),
            });
          }
        }}
        onError={(modalNotification: Notification) => notification.createNotification(modalNotification)}
      />
      <AddMatchDateBracketModal
        tournamentId={tournament?.id}
        matchDateId={currentMatchDate}
        onSuccess={async (modalMatchDateBracket: MatchDateBracket) => {
          if (tournament?.id && setTournament) {
            setTournament(await tournamentService.getTournament(tournament?.id));
            notification.createNotification({
              title: t('common:notification.addSuccessTitle', { entity: t('common:entity.teamBracket') }),
              message: t('common:notification.addSuccessMessage', { entity: t('common:entity.teamBracket') }),
            });
          }
        }}
        onError={(modalNotification: Notification) => notification.createNotification(modalNotification)}
        open={addMatchDateBracketModalOpen}
        setOpen={setAddMatchDateBracketModalOpen}
      />
      <NotificationAlert {...notification} />
    </div>
  );
};
