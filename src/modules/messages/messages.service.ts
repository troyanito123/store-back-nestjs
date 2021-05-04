import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Order } from '../order/entities/order.entity';
import { Message } from './entities/message.entity';
import { RoleOptions } from '../auth/authorization/role.decorator';
import { OrderGateway } from '../socket/order.gateway';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Order) private orderRespository: Repository<Order>,
    private orderGateway: OrderGateway,
  ) {}

  async create(createMessageDto: CreateMessageDto, userRole: string) {
    const message = this.messageRepository.create(createMessageDto);
    message.order = await this.orderRespository.findOne(
      createMessageDto.orderId,
    );
    message.isAdmin = userRole === RoleOptions.Admin ? true : false;

    const userIsOnline = this.orderGateway.userOnline.list.find(
      (u) => u.databaseId === createMessageDto.userId,
    );

    if (message.isAdmin) {
      const socketId = this.orderGateway.userOnline.list.find(
        (u) => u.databaseId === createMessageDto.userId,
      );
      this.orderGateway.server.to(socketId.socketId).emit('message-created', {
        message,
        orderId: createMessageDto.orderId,
      });
    } else {
      this.orderGateway.server.in('admin').emit('message-created', {
        message,
        orderId: createMessageDto.orderId,
      });
    }

    return this.messageRepository.save(message);
  }

  findAllByUser(userId: number, orderId: number) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.order', 'order')
      .leftJoinAndSelect('order.user', 'user')
      .where('message.order = :orderId', { orderId })
      .andWhere('order.user = :userId', { userId })
      .getMany();
  }
}
