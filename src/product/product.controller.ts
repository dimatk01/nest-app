import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductQueryDto } from './dto/product.query.dto';

@ApiTags('Products CRUD')
@Controller('product')
/* The ProductController class is responsible for handling HTTP requests related to products and
delegating the processing to the ProductService. */
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ description: 'Create new Product' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @ApiOperation({ description: 'Get products with filters' })
  @Get()
  async findAll(@Query() query: ProductQueryDto) {
    return await this.productService.findAll(query);
  }

  @ApiOperation({ description: 'Get product by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @ApiOperation({ description: 'Update product by id' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({ description: 'Delete product by id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
