import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as NETCORE_SCHEMA from '../drizzle/netcore/schema/schema';
import { SequenceTable } from './enums/sequence.enum';
import { sql } from 'drizzle-orm';

@Injectable()
export class HelperService {
  constructor(
    @Inject('NETCORE')
    private netcoreDB: PostgresJsDatabase<typeof NETCORE_SCHEMA>,
  ) {}

  async ApplicationLogSaver(
    message: string,
    api_url: string,
    log_type: string,
    stack_trace: string,
    req: string,
    token: string,
  ) {
    await this.netcoreDB.insert(NETCORE_SCHEMA.application_log).values({
      id: sql`nextval(${SequenceTable.APPLICATION_LOG})`,
      created_date: new Date().toISOString(),
      log: message,
      request_url: api_url,
      log_type: log_type,
      log_stack_trace: stack_trace,
      request: req,
      token: token,
    });
  }

  async StoreEmailLogs(objIC: any, logType: string) {
    const logObj = [];

    objIC.forEach((item) => {
      logObj.push({
        id: sql`nextval(${SequenceTable.Email_LOG})`,
        log_type: logType,
        log:
          item.response == null || item.response == ''
            ? item.response
            : item.reason == null || item.reason == ''
              ? item.reason
              : '',
        netcore_message:
          item.response == null || item.response == ''
            ? item.response
            : item.reason == null || item.reason == ''
              ? item.reason
              : '',
        netcore_message_id:
          item.sg_message_id == null || item.sg_message_id == ''
            ? item.sg_message_id
            : item.transid == null
              ? item.transid.toString()
              : '',
        netcore_Submitted_at: item.timestamp.toString(),
        netcore_status: item.Event,
        email: item.email,
        fromaddress: item.fromaddress,
        msize: item.msize,
        customargs1: item.customargs1,
        customargs2: item.customargs2,
        tags: item.tags,
        useragent: item.useragent,
        type: item.type,
        bouncereasonid: item.bouncereasonid,
        ip:
          item.ip == null || item.ip == ''
            ? item.ip
            : item.ipaddress == null || item.ipaddress == ''
              ? item.ipaddress
              : '',
        url: item.url,
        subject: item.subject,
      });
    });

    await this.netcoreDB.insert(NETCORE_SCHEMA.email_log).values(logObj);
  }
}
