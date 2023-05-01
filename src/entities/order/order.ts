import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../base-entity/base-entity';
import { Transaction } from '../transaction/transaction';
import { User } from '../user/user';
import { Wallet } from '../wallet/wallet';

@Entity()
export class Order extends Base {
  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  type: 'buy' | 'sell';

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.order)
  transactions: Transaction[];
}
