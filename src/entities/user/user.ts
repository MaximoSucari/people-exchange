import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Base } from '../base-entity/base-entity';
import { Order } from '../order/order';
import { Wallet } from '../wallet/wallet';

@Entity()
export class User extends Base {

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  tokenName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @JoinColumn()
  @OneToOne((type) => Wallet)
  wallet: Wallet;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
