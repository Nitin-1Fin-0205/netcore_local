import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
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
    SMSModule,
    SmsMsgModule,
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
  controllers: [AppController, SMSController],
  providers: [AppService, SMSService],
})
export class AppModule {}
