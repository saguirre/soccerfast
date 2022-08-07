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
import {
  PostContactInfo,
  PutContactInfo,
  ContactInfo,
  PostContactQuestion,
} from '@dtos';
import { ContactInfoService } from './contact.service';
import { Roles } from 'src/auth/auth.decorator';
import { RoleEnum } from '../enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('contact')
export class ContactInfoController {
  constructor(
    private readonly contactInfoService: ContactInfoService,
    @InjectQueue('contact-question')
    private readonly contactQuestionQueue: Queue,
  ) {}

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

  @Post('question')
  async createContactQuestion(
    @Body() contactQuestion: PostContactQuestion,
  ): Promise<void> {
    await this.contactInfoService.createContactQuestion(contactQuestion);
    this.contactQuestionQueue.add('contact-question', {
      name: contactQuestion.name,
      lastName: contactQuestion.lastName,
      email: contactQuestion.email,
      subject: contactQuestion.subject,
      message: contactQuestion.message,
      phone: contactQuestion?.phone,
    });
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
