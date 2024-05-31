import { Module } from '@nestjs/common';
import { SmsMsgService } from './sms_msg.service';
import { SmsMsgController } from './sms_msg.controller';
import { SMSMSG } from 'src/helpers/sms_msg';

@Module({
  controllers: [SmsMsgController],
  providers: [SmsMsgService, SMSMSG],
})
export class SmsMsgModule {}
