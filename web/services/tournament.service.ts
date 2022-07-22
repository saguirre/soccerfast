import { AddTournamentModel, Tournament, UpdateTournamentModel } from '@models';
import axios from 'axios';
import { HttpService } from './http-abstract.service';

export interface ITournamentService {
  getTournaments(): Promise<Tournament[]>;
  addTournament(body: AddTournamentModel): Promise<Tournament | undefined>;
  updateTournament(id: number, body: UpdateTournamentModel): Promise<Tournament | undefined>;
  getTournament(id: number): Promise<Tournament | null>;
}

export class TournamentService extends HttpService implements ITournamentService {
  private endpointPrefix: string = 'tournament';

  getTournaments = async (): Promise<Tournament[]> => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}`));
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTournament = async (body: AddTournamentModel) => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}`), body, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  updateTournament = async (id: number, body: UpdateTournamentModel) => {
    try {
      const axiosResponse = await axios.put(this.getServiceUrl(`${this.endpointPrefix}/${id}`), body, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  getTournament = async (id: number) => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/${id}`));
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
