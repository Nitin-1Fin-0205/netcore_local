import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { SMSModule } from './sms/sms.module';
import { SMSController } from './sms/sms.controller';
import { SMSService } from './sms/sms.service';
import { HttpModule } from '@nestjs/axios';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as NetCoreSchema from './drizzle/netcore/schema/schema';
import { SmsMsgModule } from './sms_msg/sms_msg.module';

@Module({
  imports: [
    EmailModule,
    SMSModule, SmsMsgModule,
    HttpModule,
    DrizzlePostgresModule.registerAsync({
      tag: 'NETCORE',
      useFactory() {
        return {
          postgres: {
            url: process.env.DATABASE_URL,
          },
          config: {
            schema: NetCoreSchema,
          },
        };
      },
    }),
  ],
  controllers: [AppController, EmailController, SMSController],
  providers: [AppService, EmailService, SMSService],
})
export class AppModule { }
