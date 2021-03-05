import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Order, (order) => order.messages)
  order: Order;
}
