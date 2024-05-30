import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Extension} from "src/Filters/extension";



@Injectable()
export class SMSService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }
}