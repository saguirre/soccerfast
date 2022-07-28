export interface PutTeam {
  name?: string;
  description?: string;
  logo?: string;
  ownerIds?: number[];
  playerIds?: number[];
  tournamentId?: number;
}
