export class SmsMsgDto {
  mobileNumber: string;
  message: string;
  templateId: number;
  variables: string[];
  otp: string;
  requestId: string;
}
