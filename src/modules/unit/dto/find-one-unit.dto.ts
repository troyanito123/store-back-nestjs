import { ExistsOnDatabase } from '../../../validations/exists-on-database';
import { Unit } from '../entities/unit.entity';

export class FindOneUnitDto {
  @ExistsOnDatabase(Unit)
  id: number;
}
