import { AddRuleModel, Rule } from "@models";
import { HttpService } from "./http-abstract.service";

export interface IRulesService {
  getRules(userToken: string): Promise<Rule[]>;
  addRule(userToken: string, body: AddRuleModel): Promise<Rule | undefined>;
  getRule(userToken: string, id: number): Promise<Rule>;
}

export class RulesService extends HttpService implements IRulesService {
  private endpointPrefix: string = "ules";

  getRules = async (RuleToken: string): Promise<Rule[]> => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix), {
        headers: this.getAuthHeaders(RuleToken),
      });

      console.log("Fetch Rules response");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addRule = async (userToken: string, body: AddRuleModel) => {
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

  getRule = async (userToken: string, id: number) => {
    try {
      const axiosResponse = await fetch(this.getServiceUrl(this.endpointPrefix) + "/" + id, {
        headers: this.getAuthHeaders(userToken),
      });
      console.log("getRule response: ");
      console.log(axiosResponse.json());
      return axiosResponse.json();
    } catch (error) {
      console.error(error);
    }
  };
}
