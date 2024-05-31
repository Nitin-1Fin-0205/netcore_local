import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SMSIp } from 'src/dto/sms';

@ApiTags('SMS')
@Controller('api/netcore')
export class SMSController {
  constructor() {}

  @Post('/message/sms')
  async SendSMS(@Body() objIC: SMSIp) {
    console.log(objIC);
    return objIC;
  }
}
