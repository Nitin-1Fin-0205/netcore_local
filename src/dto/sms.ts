// #region Output DTO

import { ApiProperty } from "@nestjs/swagger";

class SMSIp{
    @ApiProperty() mobileNumber : String = '';
    @ApiProperty() message : String = '';
    @ApiProperty() templateId : number = 0;
    @ApiProperty() variables : Array<String> = [];
    @ApiProperty() otp : String = '';
    @ApiProperty() requestId : String = '';
}

export{ SMSIp }

// #endregion



// #region Output DTO
// #endregion
