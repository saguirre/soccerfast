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
import { createContext } from 'react';

export interface IAppContext {
  contactInfoService: IContactInfoService;
  teamService: ITeamService;
  tournamentService: ITournamentService;
  ruleService: IRuleService;
}

export const AppContext = createContext<IAppContext>({
  contactInfoService: new ContactInfoService(),
  teamService: new TeamService(),
  tournamentService: new TournamentService(),
  ruleService: new RuleService(),
});
