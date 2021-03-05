import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Order])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
