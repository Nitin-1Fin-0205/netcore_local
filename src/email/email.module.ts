import { PrismaModule } from "prisma/prisma.module";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { HttpModule } from '@nestjs/axios';
import { Module } from "@nestjs/common";


@Module({
    imports:[HttpModule,PrismaModule],
    controllers: [EmailController],
    providers: [EmailService]
  })

  export class EmailModule{}