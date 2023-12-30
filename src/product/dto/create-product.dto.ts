import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true, default: 'Nike Air Jordan' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, default: '111' })
  @IsNotEmpty()
  @IsString()
  article: string;

  @ApiProperty({ required: true, default: 5 })
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
