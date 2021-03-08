import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [ValidationController],
  providers: [ValidationService],
})
export class ValidationModule {}
