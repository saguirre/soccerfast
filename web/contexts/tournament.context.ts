import { createContext, Dispatch, SetStateAction } from 'react';

import { Tournament } from '@models';

export interface ITournamentContext {
  tournament: Tournament | null;
  setTournament?: Dispatch<SetStateAction<Tournament | null>>;
}

export const TournamentContext = createContext<ITournamentContext>({
  tournament: null,
  setTournament: () => {},
});
