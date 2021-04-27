import { IsNotEmpty } from 'class-validator';

export class UpdatePushIdDto {
  @IsNotEmpty()
  pushId: string;
}
