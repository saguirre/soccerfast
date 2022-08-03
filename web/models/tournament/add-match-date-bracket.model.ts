import { AddMatchDateBracketTeam } from '../fixture/add-match-date-bracket-team.model';

export interface AddMatchDateBracketModel {
  time?: string;
  matchAlreadyHappened: boolean;
  firstTeam: AddMatchDateBracketTeam;
  secondTeam: AddMatchDateBracketTeam;
}
