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
