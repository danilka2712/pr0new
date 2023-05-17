import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';

@Module({
  imports: [TelegrafModule.forRoot({ token: "6054894674:AAGe7n3CbqnpLTAAxg_wjJRNsW-klai_cyg" })],
  providers: [AppService, AppUpdate],
})
export class AppModule { }
