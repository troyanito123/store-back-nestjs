import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { UserModule } from '../user/user.module';
import { UnitModule } from '../unit/unit.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UserModule,
    UnitModule,
    CloudinaryModule,
    ImagesModule,
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
