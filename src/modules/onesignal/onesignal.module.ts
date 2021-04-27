import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { OnesignalService } from './onesignal.service';

@Module({
  exports: [OnesignalService],
  imports: [UserModule],
  providers: [OnesignalService],
})
export class OnesignalModule {}
