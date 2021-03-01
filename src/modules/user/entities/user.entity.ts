import { Role } from '../../role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordEncrypter } from '../../../utils/password-encrypter';
import { Product } from 'src/modules/product/entities/product.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETE = 'DELETE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  authenicate(password: string): boolean {
    return PasswordEncrypter.compare(password, this.password);
  }
}
