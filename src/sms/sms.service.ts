import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as NETCORE_SCHEMA from '../drizzle/netcore/schema/schema';
import {
  sms_template,
  sms_template_credentials,
  sms_mobile_request,
} from '../drizzle/netcore/schema/schema';
import { eq, ne, sql } from 'drizzle-orm';
import { NetCoreTemplateDC } from './sms.interface';
import { SendSMSAsyncV2 } from '../helper/sms-helper';
import { NetCoreSequence } from 'src/util/enums/netcore-sequence.enum';

@Injectable()
export class SMSService {
  constructor(
    @Inject('NETCORE')
    private netcore: PostgresJsDatabase<typeof NETCORE_SCHEMA>,
  ) {}

  async SendSMS(smsMsgDto: any) {
    const templateData = await this.netcore
      .select({
        id: sms_template.id,
        entity_id: sms_template_credentials.entity_id,
        user_name: sms_template_credentials.user_name,
        feed_id: sms_template_credentials.feed_id,
        password: sms_template_credentials.password,
        sms_url: sms_template_credentials.sms_url,
        template: sms_template.template,
        template_id: sms_template.template_id,
      })
      .from(sms_template)
      .innerJoin(
        sms_template_credentials,
        eq(sms_template.credential_id, sms_template_credentials.id),
      )
      .where(eq(sms_template.id, smsMsgDto.templateId))
      .limit(1);

    if (!templateData) {
      return {
        status: 400,
        message: 'Invalid TemplateId to send SMS',
      };
    }

    const NetCoreTemplateObj: Partial<NetCoreTemplateDC> = {
      password: String(templateData[0]?.password),
      userName: String(templateData[0]?.user_name),
    };

    for (let i = 1; i <= smsMsgDto.variables.length; i++) {
      templateData[0].template = templateData[0].template.replace(
        `@${i}`,
        smsMsgDto.variables[i - 1],
      );
    }

    NetCoreTemplateObj.message = templateData[0].template;
    NetCoreTemplateObj.templateId = String(templateData[0]?.template_id);
    NetCoreTemplateObj.entityId = String(templateData[0]?.entity_id);
    NetCoreTemplateObj.feedId = String(templateData[0]?.feed_id);
    NetCoreTemplateObj.mobileNumber = Number(`91${smsMsgDto.mobileNumber}`);
    NetCoreTemplateObj.smsURI = String(templateData[0]?.sms_url);

    const sendSMSV2Res = await SendSMSAsyncV2(NetCoreTemplateObj);

    const res = sendSMSV2Res.Result.data;

    const smsMobleSave = await this.netcore.insert(sms_mobile_request).values([
      {
        id: sql`nextval(${NetCoreSequence.SMS_MOBILE_REQUEST})`,
        mobile_number: String(NetCoreTemplateObj?.mobileNumber) || '',
        request_id: res.req_id,
      },
    ]);

    const SmsNC_IM = res.map((item: any) => {
      //TODO : Check if the below code is correct
      return {
        id: sql`nextval(${NetCoreSequence.SMS_MOBILE_REQUEST})`,
        log_type: 'Response',
        log: item.req_id,
        netcore_status: item.status,
        netcore_request_id: item.req_id,
        // netcore_submitted_at: item.submitted_at,
        feedid: Number(NetCoreTemplateObj.feedId),
        service_provider: 'NetCore',
        // service_provider_id: NetCoreTemplateObj.templateId,
        created_at: sql`CURRENT_TIMESTAMP`,
      };
    });

    const storelogs = await this.netcore
      .insert(NETCORE_SCHEMA.sms_log)
      .values(SmsNC_IM);
  }
}
