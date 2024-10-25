import {
  Controller,
  Post,
  Put,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductPaginationDto } from '../dtos/product-pagination.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from '../../application/queries/get-products.query';
import { GetProductQuery } from '../../application/queries/get-product.query';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { DeleteProductCommand } from '../../application/commands/delete-product.command';
import { JwtAuthGuard } from '../../../../shared/guards/auth.guard';
import { AuthUser } from '../../../../shared/decorators/user.decorator';
import { User, UserRole } from '../../../auth/domain/models/user.model';

@ApiTags('product')
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProduct(
    @AuthUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    if (user.role == UserRole.USER) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.commandBus.execute(
      new CreateProductCommand(
        createProductDto.name,
        createProductDto.price,
        createProductDto.quantity,
        createProductDto.category,
        createProductDto.description,
        createProductDto.imageUrl,
      ),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProduct(
    @AuthUser() user: User,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (user.role == UserRole.USER) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.commandBus.execute(
      new UpdateProductCommand(
        id,
        updateProductDto?.name,
        updateProductDto?.price,
        updateProductDto?.quantity,
        updateProductDto?.category,
        updateProductDto?.description,
        updateProductDto?.imageUrl,
      ),
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Get()
  async getProducts(@Query() paginationDto: ProductPaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    return this.queryBus.execute(new GetProductsQuery(page, limit));
  }

  @Delete(':id') // Soft delete endpoint
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@AuthUser() user: User, @Param('id') id: string) {
    if (user.role == UserRole.USER) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
