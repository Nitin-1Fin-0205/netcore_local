import { HelperService } from 'src/helpers/helper.service';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [EmailController],
  providers: [EmailService, HelperService],
})
export class EmailModule {}
