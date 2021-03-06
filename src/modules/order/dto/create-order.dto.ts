import { IsJSON, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateOrderDto {
  @IsNumberString()
  total: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsJSON()
  detailsJson: string;
}
