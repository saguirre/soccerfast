import { TeamBracket } from './team-bracket.model';

export interface TournamentFixture {
  title: string;
  date?: string;
  teamBrackets: TeamBracket[];
}
