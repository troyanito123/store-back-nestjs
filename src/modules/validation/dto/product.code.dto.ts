import { IsEmail, IsNotEmpty } from 'class-validator';

export class ProductCodeDto {
  @IsNotEmpty()
  code: string;
}
