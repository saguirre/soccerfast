import { User } from '@models';
import { HttpService } from './http-abstract.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios from 'axios';

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUser(): Promise<User | null>;
  uploadAvatar(avatar: File): Promise<string | null>;
}

export class UserService extends HttpService implements IUserService {
  private endpointPrefix: string = 'user';

  getUsers = async (): Promise<User[]> => {
    try {
      return new Promise<User[]>(() => {});
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
