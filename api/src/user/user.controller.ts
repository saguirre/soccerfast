import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUser, PutUser, User } from '@dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import { readFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { SpacesFolderEnum } from '../enums';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private fileService: FileService,
  ) {}

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

  @Post('/:id/upload/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 4000000 },
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './src/images/avatars';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile()
    fileInfo: Express.Multer.File,
  ) {
    const file = readFileSync(fileInfo.path);

    const user = await this.userService.user({ id: Number(id) });
    let previousFileName = user?.avatar || null;
    if (previousFileName) {
      previousFileName = previousFileName.split('/')[4];
    }

    await this.fileService.uploadObject(
      file,
      previousFileName,
      fileInfo,
      file.byteLength,
      SpacesFolderEnum.UserAvatars,
    );
    unlinkSync(fileInfo.path);

    const avatar = `${process.env.IMAGE_RETURN_ENDPOINT}/${SpacesFolderEnum.UserAvatars}/${fileInfo.filename}`;
    await this.userService.updateUser({
      where: { id: Number(id) },
      data: { avatar },
    });

    return avatar;
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
