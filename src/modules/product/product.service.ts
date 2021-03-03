import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UnitService } from '../unit/unit.service';
import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/image.entity';
import { ProductStatus } from './entities/product.entity';
import { ImageRepository } from './image.repository';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRespository: ProductRepository,
    private userService: UserService,
    private unitService: UnitService,
    private imagesRespository: ImageRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId: number,
    images: Express.Multer.File[],
  ) {
    try {
      const urls = await this.cloudinaryService.uploadImages(images);
      const product = this.productRespository.create(createProductDto);
      product.user = await this.userService.findOne(userId);
      product.unit = await this.unitService.findOne(createProductDto.unitId);
      const imagesDB: Image[] = [];
      for (const url of urls) {
        imagesDB.push(this.imagesRespository.create({ url }));
      }
      product.images = imagesDB;
      return this.productRespository.save(product);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [error.detail],
          error: 'Interna server error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.productRespository.find({
      where: { status: ProductStatus.ACTIVE },
      relations: ['unit', 'images'],
    });
  }

  findOne(id: number) {
    return this.productRespository.findOne({
      where: { id },
      relations: ['unit', 'images'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.productRespository.findOne(id);
    this.productRespository.merge(product, updateProductDto);
    product.unit = await this.unitService.findOne(updateProductDto.unitId);
    try {
      return await this.productRespository.save(product);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [error.detail],
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    const product = await this.productRespository.findOne(id);
    product.status = ProductStatus.DELETE;
    return this.productRespository.save(product);
  }
}
