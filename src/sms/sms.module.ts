import { HttpModule } from '@nestjs/axios';
import { Module } from "@nestjs/common";
import { SMSService } from "./sms.service";
import { SMSController } from "./sms.controller";



@Module({
  imports: [HttpModule],
  controllers: [SMSController],
  providers: [SMSService]
})

export class SMSModule { }