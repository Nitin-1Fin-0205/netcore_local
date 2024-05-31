import { Test, TestingModule } from '@nestjs/testing';
import { SmsMsgController } from './sms_msg.controller';
import { SmsMsgService } from './sms_msg.service';

describe('SmsMsgController', () => {
  let controller: SmsMsgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsMsgController],
      providers: [SmsMsgService],
    }).compile();

    controller = module.get<SmsMsgController>(SmsMsgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
