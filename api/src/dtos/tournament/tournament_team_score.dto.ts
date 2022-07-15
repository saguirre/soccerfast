export interface TournamentTeamScore {
  id: number;
  teamId: number;
  tournamentId: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesTied: number;
  matchesLost: number;
  goalsAhead: number;
  goalsAgainst: number;
  points: number;
}
