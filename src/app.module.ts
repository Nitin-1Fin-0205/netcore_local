import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { SMSModule } from './sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as NETCORE_SCHEMA from './drizzle/netcore/schema/schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzlePostgresModule.registerAsync({
      tag: 'NETCORE',
      useFactory() {
        return {
          postgres: {
            url: process.env.NETCORE_DATABASE_URL,
          },
          config: {
            schema: NETCORE_SCHEMA,
          },
        };
      },
    }),
    EmailModule,
    SMSModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
