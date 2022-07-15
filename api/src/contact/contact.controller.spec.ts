import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfoController } from './contact.controller';

describe('ContactInfoController', () => {
  let controller: ContactInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactInfoController],
    }).compile();

    controller = module.get<ContactInfoController>(ContactInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
