import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(private imageRepository: ImageRepository) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
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
