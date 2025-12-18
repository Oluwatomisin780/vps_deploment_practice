import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { PaginationQuery } from 'src/utils/pagination';

export class CreateCategoryDto {
  @IsString()
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CategoryQuery extends PartialType(PaginationQuery) {}
