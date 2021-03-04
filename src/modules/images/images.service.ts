import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './image.repository';
import { Image } from './entities/image.entity';
import { Product } from '../product/entities/product.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageInterface } from '../../utils/image.interface';

@Injectable()
export class ImagesService {
  constructor(
    private imageRepository: ImageRepository,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createImageDto: CreateImageDto, file: ImageInterface) {
    const url = await this.cloudinaryService.uploadImage(file);
    const image = this.imageRepository.create({ url });
    image.product = await this.productRepository.findOne(
      createImageDto.productId,
    );
    return this.imageRepository.save(image);
  }

  async update(id: number, file: ImageInterface) {
    const image = await this.imageRepository.findOne(id);
    const imageId = this.extracImageId(image.url);
    const newUrl = await this.cloudinaryService.replaceImage(imageId, file);
    if (!newUrl) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Can not deleted before image, try again',
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    image.url = newUrl;
    return this.imageRepository.save(image);
  }

  async remove(id: number) {
    const image = await this.imageRepository.findOne(id);
    const deleted = await this.cloudinaryService.deleteImage(
      this.extracImageId(image.url),
    );
    if (!deleted) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Can not deleted this images, try again',
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.imageRepository.delete(id);
  }

  createImages(urls: string[]) {
    const res: Image[] = [];
    for (const url of urls) {
      res.push(this.imageRepository.create({ url }));
    }
    return res;
  }

  extracImageId(url: string) {
    const arr = url.split('/');
    return arr[arr.length - 1].split('.')[0];
  }
}
