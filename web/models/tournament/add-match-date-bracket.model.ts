import { AddMatchDateBracketTeam } from '../fixture/add-match-date-bracket-team.model';

export interface AddMatchDateBracketModel {
  time?: string;
  firstTeam: AddMatchDateBracketTeam;
  secondTeam: AddMatchDateBracketTeam;
}
