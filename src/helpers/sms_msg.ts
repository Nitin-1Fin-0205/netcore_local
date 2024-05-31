import { HttpService } from '@nestjs/axios';
import { ResponceOC } from './ApiResponse';

export async function SendSMSAsyncV2(obj) {
  const response = new ResponceOC();
  let jsonString = '';
  let i = 1;
  for (const key in obj.body_params) {
    if (obj.body_params[key] != obj.otp) {
      jsonString =
        jsonString == ''
          ? '{' +
            '"' +
            i.toString() +
            '"' +
            ' : ' +
            '"' +
            obj.body_params[key] +
            '"' +
            ','
          : jsonString +
            ' ' +
            '"' +
            i.toString() +
            '"' +
            ':' +
            '"' +
            obj.body_params[key] +
            '"' +
            ',';
      i = i + 1;
    }
  }

  if (jsonString.endsWith(',')) {
    jsonString = jsonString.slice(0, -1);
  }

  jsonString = jsonString.length > 2 ? jsonString + ' }' : jsonString;

  const httpService = new HttpService();
  const client = await httpService.axiosRef.post(
    `${process.env.MSG91_OTP_API}?template_id=${obj.template_id}&mobile=${obj.mobile}&authkey=${obj.authkey}&otp=${obj.otp}`,
    jsonString,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (client.status == 200) {
    response.status = 200;
    response.data = client.data;
  } else {
    response.status = 400;
    response.message = 'SMS Not Sent';
  }

  return response;
}
