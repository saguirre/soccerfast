import { AddTeamModel, Team } from '@models';
import axios from 'axios';
import { HttpService } from './http-abstract.service';
import { UpdateTeamModel } from '@models';

export interface ITeamService {
  getTeams(): Promise<Team[] | undefined>;
  addTeam(body: AddTeamModel): Promise<Team | undefined>;
  updateTeam(id: number, body: UpdateTeamModel): Promise<Team | undefined>;
  getTeam(id: number): Promise<Team | null>;
  uploadLogo(teamLogo: File): Promise<string | null>;
}

export class TeamService extends HttpService implements ITeamService {
  private endpointPrefix: string = 'team';

  getTeams = async (): Promise<Team[] | undefined> => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}`));
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  addTeam = async (body: AddTeamModel) => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}`), body, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  updateTeam = async (id: number, body: UpdateTeamModel) => {
    try {
      const axiosResponse = await axios.put(this.getServiceUrl(`${this.endpointPrefix}/${id}`), body, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  getTeam = async (id: number) => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/${id}`));
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  uploadLogo = async (teamLogo: File): Promise<string | null> => {
    try {
      let formData = new FormData();
      formData.append('logo', teamLogo, teamLogo.name);
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/upload/team-logo`), formData, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
