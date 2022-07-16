import { AddUserModel, User, UserLoginModel } from '@models';
import { HttpService } from './http-abstract.service';
import axios from 'axios';

export interface IAuthService {
  signUp(user: AddUserModel): Promise<User | null>;
  login(user: UserLoginModel): Promise<User | null>;
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

  login = async (user: UserLoginModel): Promise<User | null> => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/login`), user);
      const responseUser = axiosResponse.data;
      if (!responseUser) {
        return null;
      }

      localStorage.setItem('access_token', responseUser.token);
      return responseUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
