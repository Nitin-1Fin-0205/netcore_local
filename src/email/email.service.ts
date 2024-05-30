import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Extension} from "src/Filters/extension";



@Injectable()
export class EmailService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async getEmailTemplates(){
        const data = await this.prismaService.sms_template.findMany();
        //console.log(data);
        var response = Extension.jsonStringifyModifer(data);
        return response;
    }
}



