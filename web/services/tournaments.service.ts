import { AddTournamentModel, Tournament } from "@models/*";
import { HttpService } from "./http-abstract.service";

export interface ITournamentsService {
  getTournaments(userToken: string): Promise<Tournament[]>;
  addTournament(userToken: string, body: AddTournamentModel): Promise<Tournament | undefined>;
  getTournament(userToken: string, id: number): Promise<Tournament>;
}

export class TournamentsService extends HttpService implements ITournamentsService {
  private endpointPrefix: string = "tournaments";

  getTournaments = async (userToken: string): Promise<Tournament[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(userToken),
      });

      console.log("Fetch response");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTournament = async (userToken: string, body: AddTournamentModel) => {
    try {
      //   const axiosResponse = await axios.post(this.getServiceUrl(this.endpointPrefix), body, {
      // headers: this.getAuthHeaders(userToken),
      //   });
      //   return axiosResponse.data.data;
      return new Promise<Tournament>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getTournament = async (userToken: string, id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + "/" + id, {
        headers: this.getAuthHeaders(userToken),
      });
      console.log("getTournament response: ");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
