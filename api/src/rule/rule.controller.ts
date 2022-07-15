import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostRule, PutRule, Rule } from '@dtos';
import { RuleService } from './rule.service';

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<Rule> {
    return this.ruleService.rule({ id: Number(id) });
  }

  @Get()
  async getAllRules(): Promise<Rule[]> {
    return this.ruleService.rules({});
  }

  @Get('filtered-rules/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<Rule[]> {
    return this.ruleService.rules({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createRule(@Body() ruleData: PostRule): Promise<Rule> {
    return this.ruleService.createRule(ruleData);
  }

  @Put('/:id')
  async updateRuleProfile(
    @Param('id') id: string,
    @Body() updateRuleData: PutRule,
  ): Promise<Rule> {
    const data: PutRule = {};

    if (updateRuleData.name) data.name = updateRuleData.name;
    if (updateRuleData.articleNumber)
      data.articleNumber = updateRuleData.articleNumber;

    return this.ruleService.updateRule({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete('/:id')
  async deleteRule(@Param('id') id: string): Promise<Rule> {
    return this.ruleService.deleteRule({ id: Number(id) });
  }
}
