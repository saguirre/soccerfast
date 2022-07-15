import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Rule, Prisma } from '@prisma/client';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async rule(
    ruleWhereUniqueInput: Prisma.RuleWhereUniqueInput,
  ): Promise<Rule | null> {
    return this.prisma.rule.findUnique({
      where: ruleWhereUniqueInput,
    });
  }

  async rules(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RuleWhereUniqueInput;
    where?: Prisma.RuleWhereInput;
    orderBy?: Prisma.RuleOrderByWithRelationInput;
  }): Promise<Rule[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.rule.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRule(data: Prisma.RuleCreateInput): Promise<Rule> {
    return this.prisma.rule.create({
      data,
    });
  }

  async updateRule(params: {
    where: Prisma.RuleWhereUniqueInput;
    data: Prisma.RuleUpdateInput;
  }): Promise<Rule> {
    const { where, data } = params;
    return this.prisma.rule.update({
      data,
      where,
    });
  }

  async deleteRule(where: Prisma.RuleWhereUniqueInput): Promise<Rule> {
    return this.prisma.rule.delete({
      where,
    });
  }
}
