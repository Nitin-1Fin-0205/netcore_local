import { Body, Controller, Post, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import { NetcoreEmailDto } from './dto/email.dto';

@ApiTags('Email')
@Controller('api')
// @UseGuards(AuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/email-templates')
  async EmailTemplates() {
    debugger;
    return this.emailService.getEmailTemplates();
  }

  @Post('api/netcore/email')
  async netcoreEmail(@Body() emailDto: NetcoreEmailDto) {
    return await this.emailService.netcoreEmail(emailDto);
  }
}
