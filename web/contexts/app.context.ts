import {
  ContactInfoService,
  TeamService,
  TournamentService,
  RuleService,
  IContactInfoService,
  ITeamService,
  ITournamentService,
  IRuleService,
} from '@services';
import { Team, Tournament } from '@models';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IAppContext {
  contactInfoService: IContactInfoService;
  teamService: ITeamService;
  tournamentService: ITournamentService;
  ruleService: IRuleService;
  teams?: Team[];
  setTeams: Dispatch<SetStateAction<Team[] | undefined>>;
  tournaments?: Tournament[];
  setTournaments: Dispatch<SetStateAction<Tournament[] | undefined>>;
}

export const AppContext = createContext<IAppContext>({
  contactInfoService: new ContactInfoService(),
  teamService: new TeamService(),
  tournamentService: new TournamentService(),
  ruleService: new RuleService(),
  teams: undefined,
  setTeams: () => {},
  tournaments: undefined,
  setTournaments: () => {},
});
