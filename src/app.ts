import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { Update } from 'typegram';

const token: string = process.env.BOT_TOKEN as string;

const telegram: Telegram = new Telegram(token);

const bot: Telegraf<Context<Update>> = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
  ctx.reply('Send /start to receive a greeting');
  ctx.reply('Send /keyboard to receive a message with a keyboard');
  ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Context shortcut
  ctx.leaveChat();
});


bot.on('text', (ctx) => {
  const text = ctx.message.text
  const chatId = ctx.message.chat.id;
  if (text === 'hoşgeldin bilal' || text === 'Hoşgeldin bilal' || text === 'Hosgeldin bilal' || text === 'hosgeldin bilal') {
    telegram.sendMessage(
      chatId,
      'Hoşbuldum. Kitabımı okumayı unutmayın :)'
    );
  }
  if (text === 'ya hak' || text === 'Ya hak'){
    telegram.sendPhoto(chatId, { source: 'ya-hak.png' });
  }

});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
