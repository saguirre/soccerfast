import { AddTeamModel, Team } from "@models";
import { HttpService } from "./http-abstract.service";

export interface ITeamsService {
  getTeams(userToken: string): Promise<Team[]>;
  addTeam(userToken: string, body: AddTeamModel): Promise<Team | undefined>;
  getTeam(userToken: string, id: number): Promise<Team>;
}

export class TeamsService extends HttpService implements ITeamsService {
  private endpointPrefix: string = "teams";

  getTeams = async (userToken: string): Promise<Team[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(userToken),
      });

      console.log("Fetch teams response");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTeam = async (userToken: string, body: AddTeamModel) => {
    try {
      //   const axiosResponse = await axios.post(this.getServiceUrl(this.endpointPrefix), body, {
      // headers: this.getAuthHeaders(userToken),
      //   });
      //   return axiosResponse.data.data;
      return new Promise<Team>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getTeam = async (userToken: string, id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + "/" + id, {
        headers: this.getAuthHeaders(userToken),
      });
      console.log("getTeam response: ");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
