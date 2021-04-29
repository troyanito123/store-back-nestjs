import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Order } from '../entities/order.entity';

export class ChangeIsNewDto {
  @IsBoolean()
  isNew: boolean;

  @IsNotEmpty()
  @ExistsOnDatabase(Order)
  productId: number;
}
