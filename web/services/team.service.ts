import { AddTeamModel, Team } from '@models';
import { HttpService } from './http-abstract.service';

export interface ITeamService {
  getTeams(userToken: string): Promise<Team[]>;
  addTeam(userToken: string, body: AddTeamModel): Promise<Team | undefined>;
  getTeam(userToken: string, id: number): Promise<Team | null>;
}

export class TeamService extends HttpService implements ITeamService {
  private endpointPrefix: string = 'teams';

  getTeams = async (userToken: string): Promise<Team[]> => {
    try {
      return new Promise<Team[]>(() => {});
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addTeam = async (userToken: string, body: AddTeamModel) => {
    try {
      return new Promise<Team>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getTeam = async (userToken: string, id: number) => {
    try {
      return new Promise<Team>(() => {});
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
