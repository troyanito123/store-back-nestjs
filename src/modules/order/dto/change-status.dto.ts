import { IsEnum, IsNotEmpty } from 'class-validator';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Order, OrderStatus } from '../entities/order.entity';

export class ChangeStatusDto {
  @IsNotEmpty()
  @ExistsOnDatabase(Order)
  orderId: number;

  @IsEnum(OrderStatus, {
    message: `status must be: [${OrderStatus.new}, ${OrderStatus.pending}, ${OrderStatus.delivered}]`,
  })
  status: OrderStatus;
}
