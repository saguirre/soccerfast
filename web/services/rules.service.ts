import { AddRuleModel, Rule } from '@models';
import { HttpService } from './http-abstract.service';

export interface IRulesService {
  getRules(): Promise<Rule[]>;
  addRule(body: AddRuleModel): Promise<Rule | undefined>;
  getRule(id: number): Promise<Rule>;
}

export class RulesService extends HttpService implements IRulesService {
  private endpointPrefix: string = 'ules';

  getRules = async (): Promise<Rule[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(),
      });

      console.log('Fetch Rules response');
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addRule = async (body: AddRuleModel) => {
    try {
      //   const axiosResponse = await axios.post(this.getServiceUrl(this.endpointPrefix), body, {
      // headers: this.getAuthHeaders(RuleToken),
      //   });
      //   return axiosResponse.data.data;
      return new Promise<Rule>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getRule = async (id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + '/' + id, {
        headers: this.getAuthHeaders(),
      });
      console.log('getRule response: ');
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
