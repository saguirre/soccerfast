import { MatchBracketTeam } from "./match-bracket-team.model";

export interface MatchDateBracket {
  id: number;
  time?: string;
  matchAlreadyHappened?: boolean;
  matchDateBracketToBracketTeams?: MatchBracketTeam[];
  matchDateId?: number;
}
