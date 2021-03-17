import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImagesService } from '../images/images.service';
import { UnitService } from '../unit/unit.service';
import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRespository: ProductRepository,
    private userService: UserService,
    private unitService: UnitService,
    private imagesService: ImagesService,
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
      product.images = this.imagesService.createImages(urls);
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) {
    let product = await this.productRespository.findOne({
      where: { id },
      relations: ['images', 'unit'],
    });
    this.productRespository.merge(product, updateProductDto);
    product.unit = await this.unitService.findOne(updateProductDto.unitId);
    if (images.length > 1) {
      const urls = await this.cloudinaryService.uploadImages(images);
      const imagesProduct = this.imagesService.createImages(urls);
      for (const imageProduct of imagesProduct) {
        product.images.push(imageProduct);
      }
    }
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

  findAllProduct() {
    return this.productRespository.find({ relations: ['images'] });
  }
}
