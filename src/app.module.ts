import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { env } from 'process';

@Module({
  imports: [TelegrafModule.forRoot({ token: env.BOT_TOKEN })],
  providers: [AppService, ProductsService, AppUpdate, PrismaService],
  exports: [PrismaService],
  controllers: [ProductsController]
})
export class AppModule { }
