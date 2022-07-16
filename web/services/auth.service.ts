import { AddUserModel, User, UserLoginModel } from '@models';
import { HttpService } from './http-abstract.service';
import axios from 'axios';

export interface IAuthService {
  signUp(user: AddUserModel): Promise<User | null>;
  login(user: UserLoginModel): Promise<string | null>;
}

export class AuthService extends HttpService implements IAuthService {
  private endpointPrefix: string = 'auth';

  signUp = async (user: AddUserModel): Promise<User | null> => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/signup`), user);
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  login = async (user: UserLoginModel): Promise<string | null> => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/login`), user);
      localStorage.setItem("access_token", axiosResponse.data.access_token)
      return axiosResponse.data.access_token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
