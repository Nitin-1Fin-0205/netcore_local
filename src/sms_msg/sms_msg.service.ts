import { Inject, Injectable } from '@nestjs/common';
import { ResponceOC } from '../helpers/ApiResponse';
import { Extension } from 'src/Filters/extension';
import * as NETCORE_SCHEMA from '../drizzle/netcore/schema/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { MSGTemplate_DC } from 'src/helpers/model/msg_template_model';
import { Report, SMS_MSG_IC } from 'src/helpers/model/sms_msg_ic_model';
import { SendSMSAsyncV2 } from 'src/helpers/sms_msg';

@Injectable()
export class SmsMsgService {
  constructor(
    @Inject('NETCORE')
    private netcore: PostgresJsDatabase<typeof NETCORE_SCHEMA>,
  ) {}

  async SMSMSG(objIC) {
    const response = new ResponceOC();

    if (
      Extension.isNullOrEmpty(objIC.mobile) ||
      Extension.isNullOrEmpty(objIC.otp) == true
    ) {
      response.status = 400;
      response.message = 'Invalid Inputs';
      return response;
    }

    for (const key in objIC.variables) {
      if (Extension.isNullOrEmpty(objIC.variables[key]) == true) {
        response.status = 400;
        response.message = 'Invalid Variable data';
        return response;
      }
    }

    if (
      !objIC.mobile ||
      objIC.mobile.trim().length === 0 ||
      /^[A-Za-z]+$/.test(objIC.mobile) ||
      objIC.mobile.length < 10 ||
      objIC.mobile.length > 12
    ) {
      response.status = 400;
      response.message = 'Invalid Mobile Number';
      return response;
    }

    // MSGSender sender = new MSGSender(config,netCoreDbContext);

    const resObj = await this.GenerateMsgOtpRequest(objIC);

    return resObj;
  }

  async GenerateMsgOtpRequest(objIC) {
    const response = new ResponceOC();

    const templateData = await this.netcore
      .select({
        id: NETCORE_SCHEMA.sms_template.id,
        template_id: NETCORE_SCHEMA.sms_template.template_id,
        entity_id: NETCORE_SCHEMA.sms_template_credentials.entity_id,
        user_name: NETCORE_SCHEMA.sms_template_credentials.user_name,
        template: NETCORE_SCHEMA.sms_template.template,
        feed_id: NETCORE_SCHEMA.sms_template_credentials.feed_id,
      })
      .from(NETCORE_SCHEMA.sms_template)
      .innerJoin(
        NETCORE_SCHEMA.sms_template_credentials,
        eq(
          NETCORE_SCHEMA.sms_template_credentials.id,
          NETCORE_SCHEMA.sms_template.credential_id,
        ),
      )
      .where(eq(NETCORE_SCHEMA.sms_template.id, objIC.template_id))
      .orderBy(NETCORE_SCHEMA.sms_template.id);

    if (templateData.length == 0) {
      response.status = 400;
      response.message = 'Invalid TemplateId to send SMS';
      return response;
    }

    const obj = new MSGTemplate_DC();
    obj.otp = objIC.otp;
    obj.body_params = objIC.variables;
    obj.authkey = templateData[0].feed_id;
    obj.mobile = `91${objIC.mobile}`;
    obj.template_id = templateData[0].template_id;

    const resObj = await SendSMSAsyncV2(obj);
    const dResponse = resObj.data;

    const ip = new SMS_MSG_IC();
    const objIp = new Report();
    // objIp.desc = dResponse.type; ?
    // ip.requestId = dResponse.request_id; ?
    // ip.service_provider_id = dResponse.request_id; ?
    ip.service_provider = 'MSG';
    ip.report.push(objIp);

    const ipData = [];

    ipData.push({
      // id: sql`nextval(${SequenceTable.CUSTOMER_DATA})`,
      mobile_numer: objIC.mobile,
      //   request_id : dResponse.request_id
    });

    // await this.netcore.insert(NETCORE_SCHEMA.sms_mobile_request).values(ipData); ?

    // var StoreLogs = new MessageRepository(config, context); ?
    // StoreLogs.  StoreMSGLogs(ip, "Request");

    return resObj;
  }
}
