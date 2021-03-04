import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Detail } from './entities/detail.entity';
import { Order } from './entities/order.entity';
import { DetailInterface } from './details.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Detail) private detailRepository: Repository<Detail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    try {
      const detailsPartial: DetailInterface[] = JSON.parse(
        createOrderDto.detailsJson,
      );
      const order = this.orderRepository.create(createOrderDto);
      order.user = await this.userRepository.findOne(userId);
      const details: Detail[] = [];
      let totalConfirm = 0.0;
      for (const d of detailsPartial) {
        const product = await this.productRepository.findOne(d.productId);
        const subtotal = d.cant * product.price;
        totalConfirm = totalConfirm + subtotal;
        details.push(
          this.detailRepository.create({
            cant: d.cant,
            subtotal,
            product,
          }),
        );
      }
      order.total = totalConfirm;
      order.details = details;
      return this.orderRepository.save(order);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [error.detail],
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findAllByUser(userId: number) {
    return this.orderRepository.find({ where: { user: userId } });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'details', 'details.product', 'details.product.unit'],
    });
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
