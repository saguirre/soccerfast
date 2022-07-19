import { AddTournamentModel, Tournament } from '@models/*';
import axios from 'axios';
import { HttpService } from './http-abstract.service';

export interface ITournamentService {
  getTournaments(): Promise<Tournament[]>;
  addTournament(body: AddTournamentModel): Promise<Tournament | undefined>;
  getTournament(id: number): Promise<Tournament | undefined>;
}

export class TournamentService extends HttpService implements ITournamentService {
  private endpointPrefix: string = 'tournament';

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
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}`), body, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  // updateTeam = async (id: number, body: UpdateTeamModel) => {
  //   try {
  //     const axiosResponse = await axios.put(this.getServiceUrl(`${this.endpointPrefix}/${id}`), body, {
  //       headers: this.getAuthHeaders(),
  //     });
  //     return axiosResponse.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  getTournament = async (id: number) => {
    try {
      return new Promise<Tournament>(() => {});
    } catch (error) {
      console.error(error);
    }
  };
}
