import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProductQueryDto {

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subcategory: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sizes: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ required: false, default: "1" })
  @IsOptional()
  @IsString()
  page: string;

  @ApiProperty({ required: false, default: "10" })
  @IsOptional()
  @IsString()
  perPage: string;
}