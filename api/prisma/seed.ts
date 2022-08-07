import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma: PrismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  // Create roles
  await prisma.role.create({
    data: {
      role: 'Admin',
    },
  });

  await prisma.role.create({
    data: {
      role: 'User',
    },
  });

  await prisma.userTeamRole.create({
    data: { role: 'Owner' },
  });

  await prisma.userTeamRole.create({
    data: { role: 'Player' },
  });
  // Create users
  await prisma.user.create({
    data: {
      name: 'Santiago Aguirre',
      email: 'saguirrews@gmail.com',
      password: await bcrypt.hash('3oam4j12', await bcrypt.genSalt()),
      type: 'Email',
      activated: true
    },
  });

  await prisma.userRole.create({
    data: { userId: 1, roleId: 1 },
  });

  // Create Contact Info
  await prisma.contactInfo.create({
    data: {
      id: 1,
      companyName: 'SoccerFast',
      companyLogo: 'logo-white.svg',
      companyPhrase: 'Tu lugar para jugar al fútbol en Miami',
      copyright: 'SoccerFast 2022. Todos los derechos reservados.',
    },
  });

  await prisma.contactEmail.create({
    data: {
      id: 1,
      email: 'urucalv13@gmail.com',
      contactInfoId: 1,
    },
  });

  await prisma.contactPhone.create({
    data: {
      id: 1,
      number: '+1 (754) 231-5401',
      contactInfoId: 1,
    },
  });

  await prisma.contactPhone.create({
    data: {
      id: 2,
      number: '+1 (786) 306-8818',
      contactInfoId: 1,
    },
  });

  await prisma.contactSocialMedia.create({
    data: {
      id: 1,
      name: 'Facebook',
      logo: 'facebook',
      url: '#',
      contactInfoId: 1,
    },
  });

  await prisma.contactSocialMedia.create({
    data: {
      id: 2,
      name: 'Instagram',
      logo: 'instagram',
      url: '#',
      contactInfoId: 1,
    },
  });

  await prisma.contactSocialMedia.create({
    data: {
      id: 3,
      name: 'Twitter',
      logo: 'twitter',
      url: '#',
      contactInfoId: 1,
    },
  });
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
