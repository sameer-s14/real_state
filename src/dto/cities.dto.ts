import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCitiesDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Madhya Pradesh',
    description: 'State Name to get cities of that state',
  })
  stateName: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'StateId of which state to get cities of that state',
    example: 1,
  })
  stateId: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'default page is 1',
    example: 1,
  })
  page: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'default pageSize is set to 10',
    example: 10,
  })
  pageSize: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Send true is you want on states',
    example: true,
  })
  stateOnly: boolean;
}
