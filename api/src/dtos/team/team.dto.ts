export interface Team {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  active: boolean;
  ownerId?: number;
  tournamentId?: number;
}
