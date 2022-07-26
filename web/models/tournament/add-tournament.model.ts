export interface AddTournamentModel {
  name: string;
  description?: string | null;
  logo?: string | null;
  active?: boolean | null;
  teamIds?: number[];
}
