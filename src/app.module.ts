import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { SMSModule } from './sms/sms.module';
import { SMSController } from './sms/sms.controller';
import { SMSService } from './sms/sms.service';


@Module({
  imports: [PrismaModule, EmailModule, SMSModule],
  controllers: [AppController, EmailController, SMSController],
  providers: [AppService, EmailService, SMSService],
})
export class AppModule {}
