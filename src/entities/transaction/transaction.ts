// transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Base } from '../base-entity/base-entity';
import { Order } from '../order/order';
import { User } from '../user/user';
import { Wallet } from '../wallet/wallet';

@Entity()
export class Transaction extends Base {
  @Column()
  moneyAmount: number;

  @ManyToOne(() => Wallet, { eager: true })
  confirmerWallet: User;

  @ManyToOne(() => Wallet, { eager: true })
  offerWallet: User;

  @ManyToOne(() => Order, order => order.transactions)
  order: Order;

  @Column()
  date: Date;
}

