import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQuery {
  @IsString()
  @IsOptional()
  search?: string;
  @IsNumber()
  @IsOptional()
  limit?: number;
  @IsNumber()
  @IsOptional()
  page?: number;
}
