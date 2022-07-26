import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ContactInfo, Prisma } from '@prisma/client';

@Injectable()
export class ContactInfoService {
  constructor(private prisma: PrismaService) {}

  async contactInfo(
    contact_InfoWhereUniqueInput: Prisma.ContactInfoWhereUniqueInput,
  ): Promise<ContactInfo | null> {
    return this.prisma.contactInfo.findFirst({
      where: contact_InfoWhereUniqueInput,
      include: {
        emails: { where: { contactInfoId: contact_InfoWhereUniqueInput.id } },
        phones: { where: { contactInfoId: contact_InfoWhereUniqueInput.id } },
        socialMedias: {
          where: { contactInfoId: contact_InfoWhereUniqueInput.id },
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
