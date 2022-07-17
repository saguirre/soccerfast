import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  // Create users
  await prisma.user.create({
    data: {
      name: 'Santiago Aguirre',
      email: 'saguirrews@gmail.com',
      password: '3oam4j12',
      type: 'Email',
    },
  });

  // Create Contact Info
  await prisma.contact_Info.create({
    data: {
      id: 1,
      companyName: 'SoccerFast',
      companyLogo: 'logo-white.svg',
      companyPhrase: 'Tu lugar para jugar al fútbol en Miami',
      copyright: 'SoccerFast 2022. Todos los derechos reservados.',
    },
  });

  await prisma.contact_Email.create({
    data: {
      id: 1,
      email: 'urucalv13@gmail.com',
      contactInfoId: 1,
    },
  });

  await prisma.contact_Phone.create({
    data: {
      id: 1,
      number: '+1 (754) 231-5401',
      contactInfoId: 1,
    },
  });

  await prisma.contact_Phone.create({
    data: {
      id: 2,
      number: '+1 (786) 306-8818',
      contactInfoId: 1,
    },
  });

  await prisma.contact_Social_Media.create({
    data: {
      id: 1,
      name: 'Facebook',
      logo: 'facebook',
      url: '#',
      contactInfoId: 1,
    },
  });

  await prisma.contact_Social_Media.create({
    data: {
      id: 2,
      name: 'Instagram',
      logo: 'instagram',
      url: '#',
      contactInfoId: 1,
    },
  });

  await prisma.contact_Social_Media.create({
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
