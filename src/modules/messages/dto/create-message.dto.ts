import { IsNotEmpty, IsOptional } from 'class-validator';
import { Order } from '../../order/entities/order.entity';
import { ExistsOnDatabase } from '../../../validations/exists-on-database';

export class CreateMessageDto {
  @IsNotEmpty()
  body: string;

  @ExistsOnDatabase(Order)
  orderId: number;
}
