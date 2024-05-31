import { Body, Controller, Post } from '@nestjs/common';
import { SmsMsgService } from './sms_msg.service';
import { ApiTags } from '@nestjs/swagger';
import { MSG_IC } from './sms_msg.dto';
import { ApiResponse } from 'src/helpers/ApiResponse';

@ApiTags('SMSMSG')
@Controller('api/netcore')
export class SmsMsgController {
  constructor(private readonly MSGSMSService: SmsMsgService) { }

  @Post('/api/msg/message/sms')
  async MSG(@Body() objIC: MSG_IC) {
    try {
      const data = await this.MSGSMSService.SMSMSG(objIC);
      if (data.status == 400) {
        return new ApiResponse(400, data.message, '', '', '');
      }
      return new ApiResponse(200, 'SUCCESS', '', '', data.data);
    } catch (error) {
      return new ApiResponse(500, 'Something went wrong, please try again later', '', '', '');
    }
  }
}
