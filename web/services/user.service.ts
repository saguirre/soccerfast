import { DecodedUserToken, User } from '@models';
import { HttpService } from './http-abstract.service';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export interface IUserService {
  getUsers(): Promise<User[] | null>;
  getUser(): Promise<User | null>;
  uploadAvatar(avatar: File): Promise<string | null>;
  getFilteredUsers(searchString: string): Promise<User[] | null>;
  getFilteredUsersByTeamId(searchString: string, teamId: number): Promise<User[] | null>;
  getUsersByTeam(teamId: number): Promise<User[] | null>;
}

export class UserService extends HttpService implements IUserService {
  private endpointPrefix: string = 'user';

  getUsers = async (): Promise<User[] | null> => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}`), {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getFilteredUsers = async (searchString: string): Promise<User[] | null> => {
    try {
      if (!searchString.length) return null;
      const axiosResponse = await axios.get(
        this.getServiceUrl(`${this.endpointPrefix}/filtered-users/${searchString}`),
        {
          headers: this.getAuthHeaders(),
        }
      );
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getUsersByTeam = async (teamId: number): Promise<User[] | null> => {
    try {
      if (!teamId) return null;
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/users-by-team/${teamId}`), {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getFilteredUsersByTeamId = async (searchString: string, teamId: number): Promise<User[] | null> => {
    try {
      if (!teamId) return null;
      const axiosResponse = await axios.get(
        this.getServiceUrl(`${this.endpointPrefix}/filtered-users-by-team/${teamId}/${searchString}`),
        {
          headers: this.getAuthHeaders(),
        }
      );
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getUser = async (): Promise<User | null> => {
    try {
      const decodedToken: DecodedUserToken | null = this.getDecodedToken();
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/${decodedToken?.id}`), {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  uploadAvatar = async (avatar: File): Promise<string | null> => {
    try {
      let formData = new FormData();
      formData.append('avatar', avatar, avatar.name);
      const token = localStorage.getItem('access_token');
      if (!token) {
        return null;
      }
      const { id }: User = jwtDecode(token);

      const axiosResponse = await axios.post(
        this.getServiceUrl(`${this.endpointPrefix}/${id}/upload/avatar`),
        formData,
        {
          headers: this.getAuthHeaders(),
        }
      );
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
