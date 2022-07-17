import { AddRuleModel, Rule } from '@models';
import { HttpService } from './http-abstract.service';

export interface IRuleService {
  getRules(): Promise<Rule[]>;
  addRule(body: AddRuleModel): Promise<Rule | undefined>;
  getRule(id: number): Promise<Rule | undefined>;
}

export class RuleService extends HttpService implements IRuleService {
  private endpointPrefix: string = 'rule';

  getRules = async (): Promise<Rule[]> => {
    try {
      return new Promise<Rule[]>(() => {});

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  addRule = async (body: AddRuleModel) => {
    try {
      return new Promise<Rule>(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  getRule = async (id: number) => {
    try {
      return new Promise<Rule>(() => {});
    } catch (error) {
      console.error(error);
    }
  };
}
