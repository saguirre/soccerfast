import { Team } from '../team/team.model';
import { AddBracketScorer } from './add-bracket-scorer.model';

export interface AddMatchDateBracketTeam {
  team?: Team;
  goals?: number;
  scorers?: AddBracketScorer[];
}
