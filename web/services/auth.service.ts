import { AddUserModel, ChangePasswordModel, PasswordRecoveryModel, Role, User, UserLoginModel } from '@models';
import { HttpService } from './http-abstract.service';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { RoleEnum } from 'common/enums';

export interface IAuthService {
  signUp(user: AddUserModel): Promise<User | null>;
  login(user: UserLoginModel): Promise<any>;
  userHasRole(role: RoleEnum): boolean | undefined;
  recoverPassword(body: PasswordRecoveryModel, locale: string): void;
  validateUserToken(): Promise<boolean>;
  validateRecoveryToken(token: string): Promise<boolean>;
  validateActivationToken(token: string): Promise<boolean>;
  activateAccount(token: string): Promise<boolean>;
  changePassword(token: string, body: ChangePasswordModel): Promise<boolean>;
}

export class AuthService extends HttpService implements IAuthService {
  private endpointPrefix: string = 'auth';

  signUp = async (user: AddUserModel): Promise<User | null> => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/signup`), user);
      return axiosResponse.data;
    } catch (error) {
      return null;
    }
  };

  recoverPassword = (body: PasswordRecoveryModel, locale: string = 'es') => {
    try {
      axios.post(this.getServiceUrl(`${this.endpointPrefix}/forgot-password/${locale}`), body);
    } catch (error) {}
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

      return axiosResponse.data;
    } catch (error) {
      return false;
    }
  };

  validateRecoveryToken = async (token: string) => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/validate-recovery-token`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (axiosResponse.status === 401) {
        return false;
      }

      return axiosResponse.data;
    } catch (error) {
      return false;
    }
  };

  validateActivationToken = async (token: string) => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}/validate-activation-token`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (axiosResponse.status === 401) {
        return false;
      }

      return axiosResponse.data;
    } catch (error) {
      return false;
    }
  };

  activateAccount = async (token: string): Promise<boolean> => {
    try {
      const axiosResponse = await axios.put(this.getServiceUrl(`${this.endpointPrefix}/activate-account`), null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return axiosResponse.data;
    } catch (error) {
      return false;
    }
  };

  changePassword = async (token: string, body: ChangePasswordModel) => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/change-password`), body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return axiosResponse.data;
    } catch (error) {
      return false;
    }
  };

  login = async (user: UserLoginModel): Promise<any> => {
    try {
      return await axios.post(this.getServiceUrl(`${this.endpointPrefix}/login`), user);
    } catch (error: any) {
      return error;
    }
  };
}
