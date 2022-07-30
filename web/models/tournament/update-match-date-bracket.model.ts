import { AddMatchDateBracketTeam } from '../fixture/add-match-date-bracket-team.model';

export interface UpdateMatchDateBracketModel {
  time?: string;
  matchAlreadyHappened: boolean;
  firstTeam: AddMatchDateBracketTeam;
  secondTeam: AddMatchDateBracketTeam;
}
