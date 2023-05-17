import { Injectable } from '@nestjs/common';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

@Injectable()
export class TelegramService {
  create(createTelegramDto: CreateTelegramDto) {
    const bot = new Telegraf("6054894674:AAGe7n3CbqnpLTAAxg_wjJRNsW-klai_cyg");
    const chatId = "6054894674";
    bot.start((ctx) => console.log(ctx))
  }

  findAll() {
    return `This action returns all telegram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} telegram`;
  }

  update(id: number, updateTelegramDto: UpdateTelegramDto) {
    return `This action updates a #${id} telegram`;
  }

  remove(id: number) {
    return `This action removes a #${id} telegram`;
  }
}
