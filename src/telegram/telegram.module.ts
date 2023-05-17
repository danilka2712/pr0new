import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  controllers: [TelegramController],

  providers: [TelegramService]
})
export class TelegramModule { }
