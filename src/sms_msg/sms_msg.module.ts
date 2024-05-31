import { Module } from '@nestjs/common';
import { SmsMsgService } from './sms_msg.service';
import { SmsMsgController } from './sms_msg.controller';

@Module({
  controllers: [SmsMsgController],
  providers: [SmsMsgService],
})
export class SmsMsgModule { }
