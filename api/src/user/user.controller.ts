import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUser, PutUser, User } from '@dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id: Number(id) });
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.users({});
  }

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

  @Delete('inactivate/:id')
  async inactivateUser(@Param('id') id: string): Promise<User> {
    return this.userService.inactivateUser(
      { id: Number(id) },
      { active: false },
    );
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
