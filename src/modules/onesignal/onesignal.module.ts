import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { OnesignalService } from './onesignal.service';
import { OnesignalController } from './onesignal.controller';

@Module({
  exports: [OnesignalService],
  imports: [UserModule],
  providers: [OnesignalService],
  controllers: [OnesignalController],
})
export class OnesignalModule {}
