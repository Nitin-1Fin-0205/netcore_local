import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as NETCORE_SCHEMA from '../drizzle/netcore/schema/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { NetcoreEmailDto } from './dto/email.dto';
import { eq, inArray, and } from 'drizzle-orm';
import { HelperService } from 'src/helpers/helper.service';
import {
  NetCoreEmail,
  NetCoreEmail_Personalizations,
} from './email-template.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EmailService {
  constructor(
    @Inject('NETCORE')
    private netcoreDB: PostgresJsDatabase<typeof NETCORE_SCHEMA>,
    private readonly helperService: HelperService,
    private readonly httpService: HttpService,
  ) {}

  async getEmailTemplates() {
    // const data = await this.prismaService.sms_template.findMany();
    //console.log(data);
    // var response = Extension.jsonStringifyModifer(data);
    return 'response';
  }

  async netcoreEmail(emailDto: NetcoreEmailDto) {
    if (emailDto.templateId == 0 || emailDto.to.length == 0) {
      throw new BadRequestException('Invalid Inputs');
    }

    // emailDto.variables.forEach((item) => {
    //     if (item == null) {
    //         throw new BadRequestException("Invalid Inputs")
    //     }
    // })

    emailDto.to.forEach((item) => {
      const isEmail =
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
          item.email,
        );
      if (!isEmail) {
        throw new BadRequestException('Invalid Email Address');
      }
    });

    emailDto.cc.forEach((item) => {
      const isEmail =
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
          item.email,
        );
      if (!isEmail) {
        throw new BadRequestException('Invalid Email Address');
      }
    });

    emailDto.bcc.forEach((item) => {
      const isEmail =
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
          item.email,
        );
      if (!isEmail) {
        throw new BadRequestException('Invalid Email Address');
      }
    });

    const dataTemplate = await this.netcoreDB
      .select()
      .from(NETCORE_SCHEMA.email_templates)
      .where(eq(NETCORE_SCHEMA.email_templates.id, emailDto.templateId))
      .limit(1);

    let body = dataTemplate[0].body;
    const sub = dataTemplate[0].subject;

    if (dataTemplate.length == 0) {
      throw new BadRequestException('Invalid Template ID');
    }

    const email = emailDto.to.filter((x) => x.email.toString());
    const userEmail = email.map((x) => x.email.toString());

    const blocklist = await this.netcoreDB
      .select()
      .from(NETCORE_SCHEMA.communication_block_list)
      .where(
        and(
          eq(NETCORE_SCHEMA.communication_block_list.is_active, true),
          inArray(NETCORE_SCHEMA.communication_block_list.email, userEmail),
        ),
      )
      .limit(1);

    if (blocklist.length >= 1) {
      let str = '';
      emailDto.to.forEach((objIC) => {
        str = str == null || str == '' ? objIC.email : str + ',' + objIC.email;
      });

      await this.helperService.ApplicationLogSaver(
        'User is in Block State, Email Not Send',
        '/api/netcore/email',
        'Debug',
        '',
        str,
        '',
      );

      return {
        status: 200,
        message: 'User is in block state, Email not send',
      };
    }

    let i = 1;
    emailDto.variables.forEach((items) => {
      body = body.replace('@' + i + '@'.toString(), items.toString());
      i = i + 1;
    });

    emailDto.content.value = body;

    const template = new NetCoreEmail();

    template.from.email = emailDto.fromEmail;
    template.from.name = emailDto.fromName;
    template.subject =
      emailDto.subject == null || emailDto.subject == ''
        ? emailDto.subject
        : sub;

    template.content.push({
      type: emailDto.content.type,
      value: emailDto.content.value,
    });

    // var dataTemplate = netCoreDbContext.EmailTemplatesDBSet.Where(x => x.id == objIC.templateId).FirstOrDefault();
    // var body = dataTemplate.body;
    // var sub = dataTemplate.subject;

    const personalize = new NetCoreEmail_Personalizations();

    emailDto.to.forEach((item) => {
      personalize.to.push({
        email: item.email,
        name: item.name,
      });
    });

    emailDto.cc.forEach((item) => {
      personalize.cc.push({
        email: item.email,
        name: item.name,
      });
    });

    emailDto.to.forEach((item) => {
      personalize.bcc.push({
        email: item.email,
        name: item.name,
      });
    });

    template.personalizations.push(personalize);

    emailDto.attachments.forEach((item) => {
      const file = 'imageBytes';

      template.attachments.push({
        name: item.fileName,
        content: file,
      });
    });

    const resObj = await this.SendEmail(template);

    const dResponse = resObj.data;

    const ip = {
      response: dResponse.message,
      Event: dResponse.status,
      sg_message_id: dResponse.data.message_id,
      email: template.personalizations[0].to[0].email,
    };

    await this.helperService.StoreEmailLogs(ip, 'Request');

    return {
      status: 200,
      message: 'Success',
      data: resObj.data,
    };
  }

  async SendEmail(ipContent: any) {
    const apiKey = '67e12da2d1ef7da812fd4827d829eddc';
    const headers = { api_key: apiKey, 'Content-Type': 'application/json' };
    const data = JSON.stringify(ipContent);

    try {
      const response = await this.httpService.axiosRef.post(
        process.env.NETCORE_EMAIL_API,
        data,
        {
          headers: headers,
        },
      );

      return {
        status: 200,
        message: 'Email Send Successfully',
        data: response.data,
      };
    } catch (error) {
      throw new BadRequestException({ message: 'Email not Send' });
    }
  }
}
