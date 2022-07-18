import jwtDecode from 'jwt-decode';
import { DecodedUserToken } from 'models/decoded-user-token.model';

export abstract class HttpService {
  private serviceUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  protected getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return { Authorization: `Bearer ${token}` };
  };

  protected getDecodedToken = (): DecodedUserToken | null => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  };

  protected getServiceUrl = (completing?: string): string => {
    return `${this.serviceUrl}${completing?.length && `/${completing}`}`;
  };
}
