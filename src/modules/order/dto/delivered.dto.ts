import { IsBooleanString, IsNotEmpty } from 'class-validator';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Order } from '../entities/order.entity';

export class DeliveredDto {
  @IsBooleanString()
  delivered: boolean;

  @IsNotEmpty()
  @ExistsOnDatabase(Order)
  orderId: number;
}
