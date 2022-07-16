import { User } from '@models';
import { HttpService } from './http-abstract.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios from 'axios';

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(): Promise<User | null>;
}

export class UserService extends HttpService implements IUserService {
  private endpointPrefix: string = 'user';

  getUsers = async (): Promise<User[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(),
      });

      console.log('Fetch Users response');
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  getUser = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return null;
      }
      const { id }: User = jwtDecode(token);
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/${id}`), {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
