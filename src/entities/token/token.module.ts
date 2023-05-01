import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token';
import { TokenService } from './token.service';
import { TokensController } from './token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService],
  controllers: [TokensController],
  exports: [TokenService],
})
export class TokenModule {}
