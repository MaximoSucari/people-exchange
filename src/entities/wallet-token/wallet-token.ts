import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Token } from '../token/token';
import { Wallet } from '../wallet/wallet';

@Entity()
export class WalletToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.walletTokens)
  wallet: Wallet;

  @ManyToOne(() => Token, (token) => token.walletTokens)
  token: Token;
}
