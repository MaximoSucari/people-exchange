import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './entities/order/order';
import { Token } from './entities/token/token';
import { TokensController } from './entities/token/token.controller';
import { TokenService } from './entities/token/token.service';
import { Transaction } from './entities/transaction/transaction';
import { User } from './entities/user/user';
import { UsersController } from './entities/user/user.controller';
import { UsersService } from './entities/user/user.service';
import { WalletToken } from './entities/wallet-token/wallet-token';
import { WalletTokenController } from './entities/wallet-token/wallet-token.controller';
import { WalletTokenService } from './entities/wallet-token/wallet-token.service';
import { Wallet } from './entities/wallet/wallet';
import { WalletController } from './entities/wallet/wallet.controller';
import { WalletService } from './entities/wallet/wallet.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT) , // o el puerto que hayas configurado
      username: process.env.POSTGRES_USER, // o el nombre de usuario que hayas creado
      password: process.env.POSTGRES_PASSWORD, // o la contraseña que hayas establecido
      database: process.env.POSTGRES_DATABASE, // o el nombre de la base de datos que hayas creado
      autoLoadEntities: true,
      synchronize: true, //Not for PROD!!
    }),
    TypeOrmModule.forFeature([User, Token, Wallet, Transaction, Order, WalletToken])
  ],
  controllers: [AppController, UsersController, TokensController, WalletController, WalletTokenController],
  providers: [AppService, UsersService, TokenService, WalletService, WalletTokenService],
})
export class AppModule {}
