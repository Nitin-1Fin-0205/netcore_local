import { NetCoreSMS, NetCoreSMSDetails } from './interfaces/sms.interface';
import { HttpService } from '@nestjs/axios';

export async function SendSMSAsyncV2(json: any) {
  const netCoreSMSDetails: NetCoreSMSDetails[] = [
    {
      mobile: String(json?.mobileNumber),
      message: json?.message,
      templateid: json?.templateId,
    },
  ];

  const ipContent: NetCoreSMS = {
    feedid: json.feedId,
    username: json.userName,
    password: json.password,
    entityid: json.entityId,
    Data: netCoreSMSDetails,
  };

  const httpService = new HttpService();
  const res = await httpService.axiosRef.post(json.smsURI, ipContent, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
}
