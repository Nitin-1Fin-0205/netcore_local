import { Body, Controller, Post } from '@nestjs/common';
import { SMSService } from './sms.service';
import { bigint } from 'drizzle-orm/mysql-core';
import { Type } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { SmsMsgDto } from './dto/sms-message.dto';
@ApiTags('SMS')
@Controller('api/netcore')
export class SMSController {
  constructor(private readonly SMSService: SMSService) {}

  @Post('/message/sms')
  async SendSMS(@Body() smsMsgDto: SmsMsgDto) {
    await this.SMSService.SendSMS(smsMsgDto);
    return smsMsgDto;
  }
}
