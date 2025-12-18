import { Injectable, NotFoundException } from '@nestjs/common';
import { get } from 'http';
import { connect } from 'http2';
import { CategoryService } from 'src/modules/category/category.service';
import {
  CreateProductDto,
  ProductQuery,
  UpdateProductDto,
} from 'src/modules/product/product.type';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async createProduct(
    data: CreateProductDto,
    userId: string,
    categoryId: string,
  ) {
    const category = await this.categoryService.getCategoryById(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.prismaService.product.create({
      data: {
        name: data.name,
        userId,
        categoryId: category.id,
      },
    });
  }

  async getqueryProducts(query: ProductQuery) {
    const take = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const search = query.search || '';
    const orderBy = { createdAt: 'desc' as const };
    const [product, totalCount] = await Promise.all([
      this.prismaService.product.findMany({
        skip,
        take,
        where: {
          name: { contains: search, mode: 'insensitive' },
        },
        orderBy,
      }),

      this.prismaService.product.count(),
    ]);
    const totalPages = Math.ceil(totalCount / take);
    const pagination = {
      page,
      totalPages,
      totalCount,
    };
    return {
      data: product,
      pagination,
    };
  }

  async getProduct(id: string) {
    return await this.prismaService.product.findUnique({ where: { id } });
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return await this.prismaService.product.update({ where: { id }, data });
  }
  async deleteProduct(id: string) {
    return await this.prismaService.product.delete({ where: { id } });
  }
}
