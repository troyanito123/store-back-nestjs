import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Image } from '../entities/image.entity';

export class FindOneImageDto {
  @ExistsOnDatabase(Image)
  id: number;
}
