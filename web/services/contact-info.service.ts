import axios from 'axios';

import { ContactInfo } from '@models';
import { HttpService } from './http-abstract.service';

export interface IContactInfoService {
  getContactInfo(): Promise<ContactInfo | null>;
}

export class ContactInfoService extends HttpService implements IContactInfoService {
  private endpointPrefix: string = 'contact';

  getContactInfo = async (): Promise<ContactInfo | null> => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}`));
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
