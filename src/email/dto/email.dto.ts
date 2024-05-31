import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class EmailToDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class EmailCcDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class EmailBccDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AttachmentsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileURL: string;
}

class NetcoreEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @Type(() => ContentDto)
  content: ContentDto;

  @ApiProperty({ type: [EmailToDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmailToDto)
  to: EmailToDto[];

  @ApiProperty({ type: [EmailCcDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmailCcDto)
  cc: EmailCcDto[];

  @ApiProperty({ type: [EmailBccDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmailBccDto)
  bcc: EmailBccDto[];

  @ApiProperty({ type: [AttachmentsDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentsDto)
  attachments: AttachmentsDto[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  variables: string[];
}

export { NetcoreEmailDto };
