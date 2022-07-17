import { AddTournamentModel, Tournament } from "@models/*";
import { HttpService } from "./http-abstract.service";

export interface ITournamentService {
  getTournaments(): Promise<Tournament[]>;
  addTournament(body: AddTournamentModel): Promise<Tournament | undefined>;
  getTournament(id: number): Promise<Tournament>;
}

export class TournamentService extends HttpService implements ITournamentService {
  private endpointPrefix: string = "tournaments";

  getTournaments = async (): Promise<Tournament[]> => {
    try {
      return new Promise<Tournament[]>(() => {});
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTournament = async (body: AddTournamentModel) => {
    try {
      return new Promise<Tournament>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getTournament = async (id: number) => {
    try {
      return new Promise<Tournament>(() => {});
    } catch (error) {
      console.error(error);
    }
  };
}
