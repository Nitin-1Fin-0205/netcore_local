import { Body, Controller, Request, Post, Query, Get, UseGuards, Param, HttpCode } from '@nestjs/common';
import { AuthGuard } from 'src/Filters/auth.guard';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Email')
@Controller('api')
// @UseGuards(AuthGuard)
export class EmailController{

    constructor (private readonly emailservice : EmailService){}

@Get('/email-templates')
async EmailTemplates(){
    debugger;
    return this.emailservice.getEmailTemplates();
}



}
