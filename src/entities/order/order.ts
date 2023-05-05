import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../base-entity/base-entity';
import { Token } from '../token/token';
import { Transaction } from '../transaction/transaction';
import { User } from '../user/user';

@Entity()
export class Order extends Base {
  @Column({ type: 'float' })
  price: number;

  @Column()
  amount: number;

  @Column()
  type: 'buy' | 'sell';

  @ManyToOne(() => Token, (token) => token.orders)
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.order)
  transactions: Transaction[];
}
