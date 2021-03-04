import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Detail } from './entities/detail.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Detail, Product, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
