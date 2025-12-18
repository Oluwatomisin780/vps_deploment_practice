import { Injectable } from '@nestjs/common';
import {
  CategoryQuery,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/modules/category/category.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAllCategories(query: CategoryQuery) {
    const take = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const search = query.search || '';
    const orderBy = { createdAt: 'desc' as const };
    const [categories, totalCount] = await Promise.all([
      this.prismaService.category.findMany({
        skip,
        take,
        where: {
          name: { contains: search, mode: 'insensitive' },
        },
        orderBy,
      }),
      this.prismaService.category.count(),
    ]);
    const totalPages = Math.ceil(totalCount / take);
    const pagination = {
      page,
      totalPages,
      totalCount,
    };
    return {
      data: categories,
      pagination,
    };
  }
  async getCategoryById(id: string) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }
  async createCategory(dto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: dto,
    });
  }
  async updateCategory(dto: UpdateCategoryDto, id: string) {
    return this.prismaService.category.update({
      where: { id },
      data: dto,
    });
  }
  async deleteCategory(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
