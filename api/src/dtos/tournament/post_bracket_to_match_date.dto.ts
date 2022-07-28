import { AddMatchDateBracketTeam } from './post_match_date_bracket_team.dto';

export interface PostMatchDateBracket {
  time?: string;
  firstTeam: AddMatchDateBracketTeam;
  secondTeam: AddMatchDateBracketTeam;
}
