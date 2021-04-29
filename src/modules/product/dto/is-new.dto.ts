import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Product } from '../entities/product.entity';

export class IsNewDto {
  @IsNotEmpty()
  @ExistsOnDatabase(Product)
  productId: number;

  @IsNotEmpty()
  @IsBoolean()
  isNew: boolean;
}
