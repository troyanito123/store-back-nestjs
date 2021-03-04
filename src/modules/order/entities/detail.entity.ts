import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity({ name: 'details' })
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cant: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @ManyToOne(() => Product, (product) => product.details)
  product: Product;
}
