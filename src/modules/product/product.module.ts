import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { UserModule } from '../user/user.module';
import { UnitModule } from '../unit/unit.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Image]),
    UserModule,
    UnitModule,
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
