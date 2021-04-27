import { Module } from '@nestjs/common';
import { OnesignalService } from './onesignal.service';

@Module({
  exports: [OnesignalService],
  providers: [OnesignalService],
})
export class OnesignalModule {}
