import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Token } from '../token/token';
import { Wallet } from '../wallet/wallet';

@Entity()
export class WalletToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.walletTokens)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @ManyToOne(() => Token, (token) => token.walletTokens)
  @JoinColumn({ name: 'token_id' })
  token: Token;
}
