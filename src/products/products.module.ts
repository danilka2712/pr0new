import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductsController],
  imports: [TelegrafModule.forRoot({ token: "6054894674:AAGe7n3CbqnpLTAAxg_wjJRNsW-klai_cyg" })],
  providers: [ProductsService, PrismaService],
  exports: [ProductsController]
})
export class TelegramModule { }
