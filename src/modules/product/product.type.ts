import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator';
import { PaginationQuery } from 'src/utils/pagination';

export class CreateProductDto {
  @IsString()
  name: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductQuery extends PartialType(PaginationQuery) {}
