import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from '../base-entity/base-entity';
import { Order } from '../order/order';
import { User } from '../user/user';
import { WalletToken } from '../wallet-token/wallet-token';

@Entity()
export class Token extends Base {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  tokenQuantity: number;

  @Column()
  tokenName: string;

  @OneToMany(() => WalletToken, (walletToken) => walletToken.token, {
    eager: true,
  })
  walletTokens: WalletToken;

  @OneToMany(() => Order, (order) => order.token)
  orders: Order[];
}
