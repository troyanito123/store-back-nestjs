import { Message } from 'src/modules/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Detail } from './detail.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  total: number;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column({ default: false })
  delivered: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Detail, (detail) => detail.order, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  details: Detail[];

  @OneToMany(() => Message, (message) => message.order, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  messages: Message[];
}
