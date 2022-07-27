export interface AddTeamModel {
  name: string;
  description?: string;
  logo?: string;
  ownerIds?: number[];
  playerIds?: number[];
}
