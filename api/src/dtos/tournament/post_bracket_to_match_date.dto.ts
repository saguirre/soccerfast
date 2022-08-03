import { AddMatchDateBracketTeam } from './post_match_date_bracket_team.dto';

export interface PostMatchDateBracket {
  time?: string;
  matchAlreadyHappened: boolean;
  firstTeam: AddMatchDateBracketTeam;
  secondTeam: AddMatchDateBracketTeam;
}
