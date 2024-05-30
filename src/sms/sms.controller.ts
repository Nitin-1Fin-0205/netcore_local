import { Body, Controller, Post } from '@nestjs/common';
import { SMSService } from './sms.service';
import { bigint } from 'drizzle-orm/mysql-core';
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { ApiTags } from '@nestjs/swagger';
import { SMSIp } from 'src/dto/sms';

@ApiTags('SMS')
@Controller('api/netcore')
export class SMSController {

    constructor (private readonly SMSService : SMSService){}

    @Post('/message/sms')
    async SendSMS(@Body() objIC : SMSIp){
        console.log(objIC);
        return objIC;
    }


}




