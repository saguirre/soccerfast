import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export type UserWithRoles = Prisma.UserGetPayload<{ include: { roles: true } }>;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    @InjectQueue('activate-account')
    private readonly activateAccountQueue: Queue,
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserWithRoles | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { roles: true },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async usersWithTeams(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        ownedTeams: true,
        playingTeams: true,
      },
    });
  }

  async createUser(
    data: Prisma.UserCreateInput,
    locale: string = 'es',
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: { ...data, activated: false },
    });

    if (user) {
      const payload = {
        name: user.name,
        email: user.email,
      };

      const activationToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      await this.updateUser({
        where: { id: Number(user.id) },
        data: { activationToken },
      });

      this.activateAccountQueue.add('activate-account', {
        name: user.name,
        email: user.email,
        url: `http://localhost:3000/activate-account?token=${activationToken}`,
        locale,
      });
      return user;
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async inactivateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where,
      data,
    });
  }
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
