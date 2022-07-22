import { AddUserModel, Role, User, UserLoginModel } from '@models';
import { HttpService } from './http-abstract.service';
import axios from 'axios';
import { RoleEnum } from 'common/enums';

export interface IAuthService {
  signUp(user: AddUserModel): Promise<User | null>;
  login(user: UserLoginModel): Promise<User | null>;
  userHasRole(role: RoleEnum): boolean | undefined;
  validateUserToken(): Promise<boolean>;
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

  userHasRole = (role: RoleEnum) => {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.roles.some((userRole: Role) => userRole.role === role);
  };

  validateUserToken = async () => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/verify`), {
        headers: this.getAuthHeaders(),
      });

      if (axiosResponse.status === 401) {
        return false;
      }

      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return false;
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
