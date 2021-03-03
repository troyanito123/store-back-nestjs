import { Product } from '../../product/entities/product.entity';
import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ExistsOnDatabase(Product)
  productId: number;
}
