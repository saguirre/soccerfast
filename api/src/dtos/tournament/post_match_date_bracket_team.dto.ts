import { Team } from '../team/team.dto';
import { AddBracketScorer } from './post_bracket_scorer.dto';

export interface AddMatchDateBracketTeam {
  team?: Team;
  goals?: number;
  scorers?: AddBracketScorer[];
}
