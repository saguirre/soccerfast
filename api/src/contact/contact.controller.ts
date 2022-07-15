import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostContactInfo, PutContactInfo, ContactInfo } from '@dtos';
import { ContactInfoService } from './contact.service';

@Controller('contact')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<ContactInfo> {
    return this.contactInfoService.contactInfo({ id: Number(id) });
  }

  @Post()
  async createContactInfo(
    @Body() contactInfoData: PostContactInfo,
  ): Promise<ContactInfo> {
    return this.contactInfoService.createContactInfo(contactInfoData);
  }

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

  @Delete('/:id')
  async deleteContactInfo(@Param('id') id: string): Promise<ContactInfo> {
    return this.contactInfoService.deleteContactInfo({ id: Number(id) });
  }
}
