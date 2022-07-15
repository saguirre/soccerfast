import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ContactInfo } from '@dtos';

@Injectable()
export class ContactInfoService {
  constructor(private prisma: PrismaService) {}

  async contactInfo(
    contact_InfoWhereUniqueInput: Prisma.Contact_InfoWhereUniqueInput,
  ): Promise<ContactInfo | null> {
    return this.prisma.contact_Info.findUnique({
      where: contact_InfoWhereUniqueInput,
    });
  }

  async createContactInfo(
    data: Prisma.Contact_InfoCreateInput,
  ): Promise<ContactInfo> {
    return this.prisma.contact_Info.create({
      data,
    });
  }

  async updateContactInfo(params: {
    where: Prisma.Contact_InfoWhereUniqueInput;
    data: Prisma.Contact_InfoUpdateInput;
  }): Promise<ContactInfo> {
    const { where, data } = params;
    return this.prisma.contact_Info.update({
      data,
      where,
    });
  }

  async deleteContactInfo(
    where: Prisma.Contact_InfoWhereUniqueInput,
  ): Promise<ContactInfo> {
    return this.prisma.contact_Info.delete({
      where,
    });
  }
}
