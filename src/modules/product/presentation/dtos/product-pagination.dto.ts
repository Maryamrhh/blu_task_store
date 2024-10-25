import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ProductPaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;
}
