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
import { PostContactInfo, PutContactInfo, ContactInfo } from '@dtos';
import { ContactInfoService } from './contact.service';
import { Roles } from 'src/auth/auth.decorator';
import { RoleEnum } from '@enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contact')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Get()
  async getContactInfoById(): Promise<ContactInfo> {
    return this.contactInfoService.contactInfo({ id: 1 });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  async createContactInfo(
    @Body() contactInfoData: PostContactInfo,
  ): Promise<ContactInfo> {
    return this.contactInfoService.createContactInfo(contactInfoData);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Put('/:id')
  async updateContactInfoProfile(
    @Param('id') id: string,
    @Body() updateContactInfoData: PutContactInfo,
  ): Promise<ContactInfo> {
    const data: PutContactInfo = {};

    if (updateContactInfoData.companyName)
      data.companyName = updateContactInfoData.companyName;
    if (updateContactInfoData.companyPhrase)
      data.companyPhrase = updateContactInfoData.companyPhrase;
    if (updateContactInfoData.companyLogo)
      data.companyLogo = updateContactInfoData.companyLogo;
    if (updateContactInfoData.companyLogoUrl)
      data.companyLogoUrl = updateContactInfoData.companyLogoUrl;

    return this.contactInfoService.updateContactInfo({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete('/:id')
  async deleteContactInfo(@Param('id') id: string): Promise<ContactInfo> {
    return this.contactInfoService.deleteContactInfo({ id: Number(id) });
  }
}
