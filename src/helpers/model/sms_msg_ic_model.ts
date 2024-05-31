export class SMS_MSG_IC {
  requestId?: string | null = null;
  userId?: string | null = null;
  senderId?: string | null = null;
  service_provider_id?: string | null = null;
  service_provider?: string | null = 'MSG';
  report?: Report[] = [];
}

export class Report {
  desc?: string | null = null;
  status?: string | null = null;
  number?: string | null = null;
  date?: string | null = null;
}
