import { Module } from '@nestjs/common';
import { OrderGateway } from './order.gateway';
import { UserSocket } from './user-socket';
import { UsersOnline } from './users-online';

@Module({
  exports: [OrderGateway],
  providers: [OrderGateway, UserSocket],
})
export class SocketModule {}
