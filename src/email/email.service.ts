import { Injectable } from '@nestjs/common';
import { Extension } from 'src/Filters/extension';

@Injectable()
export class EmailService {
  constructor() {}

  async getEmailTemplates() {
    // const data = await this.prismaService.sms_template.findMany();
    //console.log(data);
    // var response = Extension.jsonStringifyModifer(data);
    return 'response';
  }
}
