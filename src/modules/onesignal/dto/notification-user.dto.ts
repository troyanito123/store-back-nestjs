import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class NotificationUserDto {
  @ExistsOnDatabase(User)
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
