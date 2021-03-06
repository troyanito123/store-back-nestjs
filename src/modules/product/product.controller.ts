import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { FindOneProductDto } from './dto/find-one-product.dto';
import { join } from 'path';
import { IsNewDto } from './dto/is-new.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: join(__dirname, '../../public/img/uploads'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
    @UploadedFiles() files,
  ) {
    return this.productService.create(createProductDto, req.user.id, files);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param() params: FindOneProductDto) {
    return this.productService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: join(__dirname, '../../public/img/uploads'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @Param() params: FindOneProductDto,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files,
  ) {
    return this.productService.update(params.id, updateProductDto, files);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param() params: FindOneProductDto) {
    return this.productService.remove(params.id);
  }

  @Get('admin/all')
  @Roles(RoleOptions.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllProducts() {
    return this.productService.findAllProduct();
  }

  @Put('change/isnew')
  @UseGuards(JwtAuthGuard)
  updateIsNew(@Body() isNewDto: IsNewDto) {
    return this.productService.updateIsNew(isNewDto);
  }
}
