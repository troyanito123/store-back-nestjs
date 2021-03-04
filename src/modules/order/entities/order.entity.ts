import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Detail, (detail) => detail.order)
  details: Detail[];
}
