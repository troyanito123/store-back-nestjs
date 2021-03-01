import { Unit } from 'src/modules/unit/entities/unit.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Image } from './image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Unit, (unit) => unit.products)
  unit: Unit;

  @OneToMany(() => Image, (image) => image.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Image[];

  @BeforeInsert()
  @BeforeUpdate()
  codeToUppercase() {
    this.code = this.code.trim().toUpperCase();
  }
}
