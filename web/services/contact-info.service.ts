import axios from 'axios';

import { ContactInfo, ContactQuestionModel } from '@models';
import { HttpService } from './http-abstract.service';

export interface IContactInfoService {
  getContactInfo(): Promise<ContactInfo | null>;
  addContactQuestion(data: ContactQuestionModel): Promise<void>;
}

export class ContactInfoService extends HttpService implements IContactInfoService {
  private endpointPrefix: string = 'contact';

  getContactInfo = async (): Promise<ContactInfo | null> => {
    try {
      const axiosResponse = await axios.get(this.getServiceUrl(`${this.endpointPrefix}`), {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  addContactQuestion = async (data: ContactQuestionModel): Promise<void> => {
    try {
      const axiosResponse = await axios.post(this.getServiceUrl(`${this.endpointPrefix}/question`), data, {
        headers: this.getAuthHeaders(),
      });
      return axiosResponse.data;
    } catch (error) {}
  };
}
