import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async existsEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }

  async existsProductCode(code: string) {
    const product = await this.productRepository.findOne({ where: { code } });
    return product ? true : false;
  }
}
