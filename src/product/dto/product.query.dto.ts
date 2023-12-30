import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subcategory: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sizes: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string | undefined;

  @ApiProperty({ required: false, default: '0' })
  @IsOptional()
  @IsString()
  page: string | undefined;

  @ApiProperty({ required: false, default: '10' })
  @IsOptional()
  @IsString()
  perPage: string | undefined;
}
