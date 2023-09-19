import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class SavePropertyDto {
  @ApiPropertyOptional({ type: 'integer', example: 3 })
  @IsInt()
  @IsNotEmpty()
  listingTypeId: number;

  @ApiPropertyOptional({ type: 'integer', example: 1738 })
  @IsInt()
  @IsNotEmpty()
  cityId: number;

  @ApiPropertyOptional({ type: 'integer', example: 19 })
  @IsInt()
  @IsNotEmpty()
  stateId: number;
}

export class UpdatePropertyDto extends PartialType(SavePropertyDto) {}

export class SaveLocationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    example: 'mhow',
  })
  address: string;

  @ApiPropertyOptional({
    type: 'boolean',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  exactLocation: boolean;

  @ApiProperty({
    type: 'string',
    example: '12.342',
  })
  @IsOptional()
  @IsNumberString()
  lat: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '12.342',
  })
  @IsOptional()
  @IsNumberString({})
  long: string;
}

export class StreetInfosDto {
  @ApiProperty({
    type: 'number',
    example: 45,
  })
  @IsNumber()
  streetWidth: number;

  @ApiProperty({
    type: 'number',
    example: 33,
  })
  @IsNumber()
  facingTypeId: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  position: number;
}

export class SavePropertyDetailsDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  id: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 2,
  })
  mainTypeId?: number;

  @ApiProperty({
    type: 'number',
    example: 39,
  })
  @IsNumber()
  propertyTypeId?: number;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  electricityMeter?: boolean;

  @ApiProperty({
    type: 'boolean',
    example: false,
  })
  @IsBoolean()
  waterMeter?: boolean;

  @ValidateNested({ each: true })
  @Type(() => StreetInfosDto)
  streetInfo?: StreetInfosDto[];

  @ApiProperty({
    type: 'number',
    example: 450,
  })
  @IsNumber()
  builtUpArea?: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 35,
  })
  possessionTypeId?: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  @IsNumber()
  listingTypeId?: number;

  @ApiProperty({
    type: 'number',
    example: 600,
  })
  @IsNumber()
  carpetArea?: number;

  @ApiProperty({
    type: 'string',
    example: '2023',
  })
  @IsNumberString()
  buildYear?: string;

  @ApiProperty({
    type: 'number',
    example: 39,
  })
  @IsNumber()
  facingTypeId?: number;

  @ApiProperty({
    type: 'number',
    example: 155.0,
  })
  @IsNumber()
  rentalPrice?: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  @IsNumber()
  purposeId?: number;

  @ApiProperty({
    type: 'number',
    example: 46,
  })
  @IsNumber()
  residenceTypeId?: number;
}

export class PropertyFeature {
  @ApiPropertyOptional({
    type: 'number',
    example: 2,
  })
  @IsNumber()
  noOfFloors?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 3,
  })
  @IsNumber()
  noOfBathrooms?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 2,
  })
  @IsNumber()
  noOfGuestrooms?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 5,
  })
  @IsNumber()
  noOfLivingRooms?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  noOfParkings?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 2,
  })
  @IsNumber()
  furnishingTypeId?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
    description: 'This it the id of property',
  })
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 20,
  })
  @IsNumber()
  landDepth?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 200,
  })
  @IsNumber()
  landLength?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  mainTypeId?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 5,
  })
  @IsNumber()
  noOfApartments?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 2,
  })
  @IsNumber()
  noOfOffice?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 4,
  })
  @IsNumber()
  noOfOpening?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 4,
  })
  @IsNumber()
  propertyTypeId?: number;
}

export class SavePropertyFeatureDto extends PartialType(PropertyFeature) {}
