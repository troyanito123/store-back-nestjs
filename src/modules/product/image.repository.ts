import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

export class ImageRepository extends Repository<Image> {}
