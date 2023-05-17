import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
} from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) { }
  @Start()
  async start(@Ctx() ctx: Context) {
    const message = 'Привет! Наш магазин предлагает удобный и простой способ заказать товары. Для начала покупки просто нажмите на кнопку "Товары" внизу страницы. Если нужной кнопки нет,кликните на иконку рядом с микрофоном или введите "/start". Мы гарантируем быструю и удобную покупку! ';
    const keyboard = Markup.keyboard([Markup.button.webApp("Товары", 'https://telegram-web-five.vercel.app/')]).resize(true)
    const image = 'https://example.com/image.jpg'
    await ctx.reply(message, keyboard)
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @On("web_app_data")
  async hears(@Ctx() ctx: Context) {
    console.log(ctx.webAppData.data.json())
  }

}