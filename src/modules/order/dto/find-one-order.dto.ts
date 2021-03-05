import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Order } from '../entities/order.entity';

export class FindOneOrderDto {
  @ExistsOnDatabase(Order)
  id: number;
}
