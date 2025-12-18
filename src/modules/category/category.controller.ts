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
} from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import {
  CategoryQuery,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/modules/category/category.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get('')
  async getAllCategories(@Query() query: CategoryQuery) {
    return this.categoryService.getAllCategories(query);
  }

  @Get('/:id')
  async getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Patch('/:id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(dto, id);
  }

  @Delete('/:id')
  async deleteCategory(id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
