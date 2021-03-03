import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './entities/image.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Product]), CloudinaryModule],
  exports: [ImagesService],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
