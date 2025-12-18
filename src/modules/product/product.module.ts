import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [PrismaModule,CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
