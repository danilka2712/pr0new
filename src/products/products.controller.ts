import { Controller, Get, Body, Post } from '@nestjs/common';

import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from './products.service';


@Controller("tg")
export class ProductsController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private prisma: PrismaService, private productsService: ProductsService) { }

  @Post()
  async findUser(username: string, id: string) {
    return await this.productsService.findUser(username, id)
  }
  @Post()
  async createUser(id: string, username: string) {
    return await this.productsService.createUser(id, username)
  }
  @Get()
  async userFind() {
    return "dsadas"
  }





}