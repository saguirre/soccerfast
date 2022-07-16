import { AddTournamentModel, Tournament } from "@models/*";
import { HttpService } from "./http-abstract.service";

export interface ITournamentsService {
  getTournaments(): Promise<Tournament[]>;
  addTournament(body: AddTournamentModel): Promise<Tournament | undefined>;
  getTournament(id: number): Promise<Tournament>;
}

export class TournamentsService extends HttpService implements ITournamentsService {
  private endpointPrefix: string = "tournaments";

  getTournaments = async (): Promise<Tournament[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(),
      });

      console.log("Fetch response");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTournament = async (body: AddTournamentModel) => {
    try {
      //   const axiosResponse = await axios.post(this.getServiceUrl(this.endpointPrefix), body, {
      // headers: this.getAuthHeaders(),
      //   });
      //   return axiosResponse.data.data;
      return new Promise<Tournament>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getTournament = async (id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + "/" + id, {
        headers: this.getAuthHeaders(),
      });
      console.log("getTournament response: ");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
