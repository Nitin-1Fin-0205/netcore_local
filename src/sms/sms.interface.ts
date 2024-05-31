export interface StandardResponse {
  status: number;
  message: string;
}

export interface NetCoreTemplateDC {
  templateId: string;
  message: string;
  feedId: string;
  entityId: string;
  userName: string;
  password: string;
  mobileNumber: number;
  smsURI: string;
}

export interface NetCoreSMS {
  feedid: string;
  username: string;
  password: string;
  entityid: string;
  Data: NetCoreSMSDetails[];
}

export interface NetCoreSMSDetails {
  mobile: string;
  message: string;
  templateid: string;
}
