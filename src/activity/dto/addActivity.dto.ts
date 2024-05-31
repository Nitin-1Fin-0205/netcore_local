import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";


class ActivityParams
{
    @IsUUID()
    @ApiProperty()
    customer_user_id: string

    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    mobile_number: string

    @IsString()
    @ApiProperty()
    assigned_to: string

    @IsString()
    @ApiProperty()
    date: string

    @IsString()
    @ApiProperty()
    time: string

    @IsString()
    @ApiProperty()
    meeting_link: string

    @IsString()
    @ApiProperty()
    reporting_advisor_email:string

    @IsString()
    @ApiProperty()
    reporting_card_link:string

    @IsNumber()
    @ApiProperty()
    cycle: number

}

export class AddActivity {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    asset_id: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    activity_name: string

    @IsDate()
    @ApiProperty()
    timestamp: Date

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    identity: string

    @IsString()
    @ApiProperty({default: "app"})
    activity_source: string


    @ApiProperty({ type: () => ActivityParams })
    @ValidateNested({ each: true })
    activity_params: ActivityParams;
}




