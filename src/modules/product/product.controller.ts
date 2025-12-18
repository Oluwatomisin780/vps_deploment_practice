import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators/getCurrentUser.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { ProductService } from 'src/modules/product/product.service';
import {
  CreateProductDto,
  ProductQuery,
  UpdateProductDto,
} from 'src/modules/product/product.type';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  async getProducts(@Query('query') query: ProductQuery) {
    return await this.productService.getqueryProducts(query);
  }

  @Get('/:id')
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productService.getProduct(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:categoryId')
  async createProduct(
    @Body() dto: CreateProductDto,
    @User() user: any,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    //create a decorator to get user id from request
    console.log('User in createProduct:', user);
    return await this.productService.createProduct(dto, user.id, categoryId);
  }

  @Patch('/:id')
  async updateProduct(
    @Body() dto: UpdateProductDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productService.deleteProduct(id);
  }
}
