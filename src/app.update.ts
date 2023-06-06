import { unsubscribe } from 'diagnostics_channel';
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
  Action,
} from 'nestjs-telegraf';
import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { PrismaService } from './prisma.service';
import { ProductsService } from './products/products.service';
@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private prisma: PrismaService, private productsService: ProductsService) { }
  @Start()
  async start(ctx: Context) {
    const id = ctx.from.id
    const username = ctx.from.username
    await this.productsService.createUser(id.toString(), username)
    const buttons = Markup.inlineKeyboard([
      [Markup.button.callback("В магазин", "btn_1")], [Markup.button.callback("Мои бонусы", "btn_2"), Markup.button.callback("О доставке", "btn_3"), Markup.button.callback("Кидалы", "btn_4")]])


    await ctx.replyWithHTML("\n<b>Сигареты оптом и в розницу от 2 блоков в Омске!</b>\nОт 20 блоков цена ещё ниже!\n\nПо городу доставка на такси в течение 30 минут! В другие города доставка почтой России.\n\nЛюбые вопросы - @dn_55_k", buttons
    )
  }
  @Action("btn_1")
  async button_1(ctx: Context) {
    try {
      const message = '<b>Нажмите на кнопку "Товары" снизу.</b>\n<i>Выберете сигареты, проверьте корзину и нажмите кнопку оформить.\nПосле оформление заявки, в течение нескольких минут мы с вами свяжемся.</i>\n\n<b>Минимальный заказ</b>\n<i>По городу Омск от 2 блоков, по всей России почтой от 3 блоков</i>';
      const keyboard = Markup.keyboard([Markup.button.webApp("Товары", 'https://telegram-web-five.vercel.app/')]).resize(true)
      await ctx.replyWithHTML(message, keyboard)
    } catch (e) {
      await ctx.sendMessage("Ошибка!\n\nПерезапустите бот командой /start")
    }
  }
  @Action("btn_2")
  async button_2(ctx: Context) {
    const id = await ctx.from.id
    const username = await ctx.from.username
    const userInfo = await this.productsService.findUser(username, id.toString())
    const message = `<b>У вас: ${userInfo.balance.toString()} бонусов</b>\n\nЗа каждый заказ вы будете получать бонусы, 1 бонус = 1 рублю.\nЧтобы использовать бонусы, отправьте нам сообщение, указав, что хотите потратить их.`
    await ctx.replyWithHTML(message)
  }
  @Action("btn_3")
  async button_3(ctx: Context) {
    const message = "<b>Доставка в городе Омск</b>\nПо городу Омск доставляем сигареты от 2 блоков на такси +200р к чеку, после оплаты в течение 30 минут ваш заказ будет отправлен, оплачивайте только тогда когда будете уверены что сможете встретить такси!\n\n<b>Доставка по России</b>\nВ другие города посылки доставляем почтой России.\n<b>Рассчитать стоимость доставки</b> вы можете на сайте pochta.ru выбрав город отправление Самара -> ваш город куда отправить, и вес посылки в среднем вес 1 блока 280г.\n\n<b>Отправка наложенным платежем</b>\nВременно не осуществляем, будет немного позже!"
    const buttons = Markup.inlineKeyboard([
      [Markup.button.callback("Назад", "btn_5")]])
    await ctx.replyWithHTML(message, buttons)
  }
  @Action("btn_4")
  async button_4(ctx: Context) {
    const badShop = "<b>Мошенники</b>\n<i>Они часто меняют свои никнеймы, но идентификатор остается. Заходим в бот @getmy_idbot и отправляем никнейм, затем смотрим, есть ли этот идентификатор в списке.\nЕсли такой идентификатор, например -1001483207238, мы убираем первые 3 символа -100, и получаем число 1483207238.</i>\n\n<b>Они будут уверять что мы конкуренты</b> и т.д, верить нам или нет решать вам! В этом списке далеко не все мошенники будьте всегда бдительны!\n\n@sigaretioptom_rf - id 1762531501\n@manager_tabak - id 1840571772\n@opttabakur - id 1202510315\n@Tabak6543 - id 1515624897\n@sigarety_777 - id 1483207238\n@sigarety_1 - id 1461074826\n@sky_top_top - id 1544290430\n@sigarety_optom3 - id 1765231398\n@house_tabak - id 5980141784\n@andrey_smoke - id  6065484711\n@moskva_piterej - id 1651004728"
    await ctx.replyWithHTML(badShop)

  }
  @Action("btn_5")
  async button_5(ctx: Context) {
    await this.start(ctx)

  }
  @On("web_app_data")
  async hears(@Ctx() ctx: Context) {
    const user = await ctx.message.from
    const order: any = await ctx.webAppData.data.json()
    let message = "Ваш заказ:\n";
    order[0].cart.forEach((item) => {
      message += `${item.name}\nКоличество: ${item.quantity}\n\n`;
    });
    await this.productsService.createOrder(user, order)
    let messageApi = `%0AВесь заказ:%0A`;
    order[0].cart.forEach((item) => {
      messageApi += `${item.name}%0AКоличество: ${item.quantity}%0A%0A`;
    });
    const messages = `Заказ оформлен @${user.username}.%0A%0A${messageApi}%0A`

    ctx.replyWithHTML(`<b>Ваш никнейм @${user.username}</b> не меняйте его до получения посылки. Мы свяжемся с вами в течение нескольких минут для подтверждения заказа и уточнение адреса доставки.\n\n${message}\n\n`)
    await this.productsService.findUser(order[0].cart, user.username)
    await fetch(`https://api.telegram.org/bot6054894674:AAGe7n3CbqnpLTAAxg_wjJRNsW-klai_cyg/sendMessage?chat_id=596613157&text=${messages}`)
  }

}