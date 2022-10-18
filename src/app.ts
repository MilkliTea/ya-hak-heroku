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
  const isBot = ctx.message.from.is_bot;

    if (text.toLowerCase() === 'ya hak' && !isBot){
        telegram.sendMessage(chatId, 'YA HAK');
        telegram.sendVoice(chatId, { source: 'ses.mp3' });
        telegram.sendPhoto(chatId, { source: 'ya-hak.png' });
    }

});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
