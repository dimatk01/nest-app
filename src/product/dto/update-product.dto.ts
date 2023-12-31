import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  article: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  subcategoryId: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  modelId: number;
}
