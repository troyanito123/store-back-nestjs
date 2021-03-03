import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Unit } from '../../unit/entities/unit.entity';
import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { UniqueCode } from '../../../validations/unique-code';
import { Product } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @UniqueCode(Product)
  code: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  description: string;

  @ExistsOnDatabase(Unit)
  unitId: number;
}
