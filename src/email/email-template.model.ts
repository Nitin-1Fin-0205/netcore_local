export class NetCoreEmail {
  from: NetCoreEmail_ToFromCC;
  subject: string;
  content: NetCoreEmail_Content[];
  personalizations: NetCoreEmail_Personalizations[];
  attachments: NetCoreEmail_Attachments[];
}

export class NetCoreEmail_ToFromCC {
  email: string;
  name: string;
}

export class NetCoreEmail_Content {
  type: string;
  value: string;
}

export class NetCoreEmail_Attachments {
  name: string;
  content: string;
}

export class NetCoreEmail_Personalizations {
  to: NetCoreEmail_ToFromCC[];
  cc: NetCoreEmail_ToFromCC[];
  bcc: NetCoreEmail_ToFromCC[];
}
