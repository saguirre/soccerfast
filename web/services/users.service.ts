import { AddUserModel, User } from "@models";
import { HttpService } from "./http-abstract.service";

export interface IUsersService {
  getUsers(userToken: string): Promise<User[]>;
  addUser(userToken: string, body: AddUserModel): Promise<User | undefined>;
  getUser(userToken: string, id: number): Promise<User>;
}

export class UsersService extends HttpService implements IUsersService {
  private endpointPrefix: string = "Users";

  getUsers = async (userToken: string): Promise<User[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(userToken),
      });

      console.log("Fetch Users response");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addUser = async (userToken: string, body: AddUserModel) => {
    try {
      //   const axiosResponse = await axios.post(this.getServiceUrl(this.endpointPrefix), body, {
      // headers: this.getAuthHeaders(userToken),
      //   });
      //   return axiosResponse.data.data;
      return new Promise<User>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getUser = async (userToken: string, id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + "/" + id, {
        headers: this.getAuthHeaders(userToken),
      });
      console.log("getUser response: ");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
