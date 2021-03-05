import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Order } from '../order/entities/order.entity';
import { Message } from './entities/message.entity';
import { RoleOptions } from '../auth/authorization/role.decorator';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Order) private orderRespository: Repository<Order>,
  ) {}

  async create(createMessageDto: CreateMessageDto, userRole: string) {
    const message = this.messageRepository.create(createMessageDto);
    message.order = await this.orderRespository.findOne(
      createMessageDto.orderId,
    );
    message.isAdmin = userRole === RoleOptions.Admin ? true : false;
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
