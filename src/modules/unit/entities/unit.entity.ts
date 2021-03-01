import { Product } from 'src/modules/product/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'units' })
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.unit)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  codeToUppercase() {
    this.code = this.code.trim().toUpperCase();
  }
}
