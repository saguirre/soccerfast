export abstract class HttpService {
  private serviceUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  protected getAuthHeaders = (userToken: string) => {
    return { Authorization: `Bearer ${userToken}` };
  };

  protected getServiceUrl = (completing?: string): string => {
    return `${this.serviceUrl}${completing?.length && `/${completing}`}`;
  };
}
