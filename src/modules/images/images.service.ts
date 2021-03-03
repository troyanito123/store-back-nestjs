import { Injectable } from '@nestjs/common';
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

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  createImages(urls: string[]) {
    const res: Image[] = [];
    for (const url of urls) {
      res.push(this.imageRepository.create({ url }));
    }
    return res;
  }
}
