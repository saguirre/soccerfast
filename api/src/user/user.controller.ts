import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUser, PutUser, User } from '@dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.user({ id: Number(id) });
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('filtered-users/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<User[]> {
    return this.userService.users({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
          {
            phone: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async signupUser(@Body() userData: PostUser): Promise<User> {
    return this.userService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserData: PutUser,
  ): Promise<User> {
    const data: PutUser = {};

    if (updateUserData.avatar) data.avatar = updateUserData.avatar;
    if (updateUserData.birthday) data.birthday = updateUserData.birthday;
    if (updateUserData.name) data.name = updateUserData.name;
    if (updateUserData.phone) data.phone = updateUserData.phone;

    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('inactivate/:id')
  async inactivateUser(@Param('id') id: string): Promise<User> {
    return this.userService.inactivateUser(
      { id: Number(id) },
      { active: false },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
