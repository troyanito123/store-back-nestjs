import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Unit } from '../../unit/entities/unit.entity';
import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { ProductStatus } from '../entities/product.entity';

export class UpdateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  description: string;

  @ExistsOnDatabase(Unit)
  unitId: number;

  @IsNotEmpty()
  @IsEnum(ProductStatus, { message: 'status must be: ACTIVE or DELETE' })
  status: ProductStatus;
}
