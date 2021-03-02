import { IsNotEmpty, IsOptional } from 'class-validator';
import { UniqueCode } from '../../../validations/unique-code';
import { Unit } from '../entities/unit.entity';

export class CreateUnitDto {
  @IsNotEmpty()
  name: string;

  @UniqueCode(Unit)
  code: string;

  @IsOptional()
  description: string;
}
