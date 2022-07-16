export abstract class HttpService {
  private serviceUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  protected getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
  };

  protected getServiceUrl = (completing?: string): string => {
    return `${this.serviceUrl}${completing?.length && `/${completing}`}`;
  };
}
