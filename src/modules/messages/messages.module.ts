import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { Order } from '../order/entities/order.entity';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Order]), SocketModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
