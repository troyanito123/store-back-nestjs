import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UnitService } from '../unit/unit.service';
import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/image.entity';
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
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
