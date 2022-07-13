// import { AxiosRequestHeaders } from "axios";

export abstract class HttpService {
  private serviceUrl: string = "http://localhost:4200/api/v1";

  protected getAuthHeaders = (userToken: string) => {
    return { Authorization: `Bearer ${userToken}` };
  };

  protected getServiceUrl = (completing?: string): string => {
    return `${this.serviceUrl}${completing?.length && `/${completing}`}`;
  };
}
