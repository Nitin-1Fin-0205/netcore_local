// #region Output DTO

import { ApiProperty } from '@nestjs/swagger';

class SMSIp {
  @ApiProperty() mobileNumber: string = '';
  @ApiProperty() message: string = '';
  @ApiProperty() templateId: number = 0;
  @ApiProperty() variables: Array<string> = [];
  @ApiProperty() otp: string = '';
  @ApiProperty() requestId: string = '';
}

export { SMSIp };

// #endregion

// #region Output DTO
// #endregion
