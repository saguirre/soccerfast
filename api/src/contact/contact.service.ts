import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ContactInfo, ContactQuestion, Prisma } from '@prisma/client';
import { PostContactQuestion } from '@dtos';

@Injectable()
export class ContactInfoService {
  constructor(private prisma: PrismaService) {}

  async contactInfo(
    contactInfoWhereUniqueInput: Prisma.ContactInfoWhereUniqueInput,
  ): Promise<ContactInfo | null> {
    return this.prisma.contactInfo.findFirst({
      where: contactInfoWhereUniqueInput,
      include: {
        emails: { where: { contactInfoId: contactInfoWhereUniqueInput.id } },
        phones: { where: { contactInfoId: contactInfoWhereUniqueInput.id } },
        socialMedias: {
          where: { contactInfoId: contactInfoWhereUniqueInput.id },
        },
      },
    });
  }

  async createContactInfo(
    data: Prisma.ContactInfoCreateInput,
  ): Promise<ContactInfo> {
    return this.prisma.contactInfo.create({
      data,
    });
  }

  async createContactQuestion(
    data: PostContactQuestion,
  ): Promise<ContactQuestion> {
    const contactQuestion = await this.prisma.contactQuestion.create({
      data,
    });

    return contactQuestion;
  }

  async updateContactInfo(params: {
    where: Prisma.ContactInfoWhereUniqueInput;
    data: Prisma.ContactInfoUpdateInput;
  }): Promise<ContactInfo> {
    const { where, data } = params;
    return this.prisma.contactInfo.update({
      data,
      where,
    });
  }

  async deleteContactInfo(
    where: Prisma.ContactInfoWhereUniqueInput,
  ): Promise<ContactInfo> {
    return this.prisma.contactInfo.delete({
      where,
    });
  }
}
