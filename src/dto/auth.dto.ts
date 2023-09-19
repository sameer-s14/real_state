import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiPropertyOptional({ type: 'string', example: 'dummy name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: '1234567' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
