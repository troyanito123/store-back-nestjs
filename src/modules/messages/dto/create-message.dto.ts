import { IsNotEmpty, IsOptional } from 'class-validator';
import { Order } from '../../order/entities/order.entity';
import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  body: string;

  @ExistsOnDatabase(Order)
  orderId: number;

  @ExistsOnDatabase(User)
  userId: number;
}
