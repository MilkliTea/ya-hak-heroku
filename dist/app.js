"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const token = process.env.BOT_TOKEN;
const telegram = new telegraf_1.Telegram(token);
const bot = new telegraf_1.Telegraf(token);
const chatId = process.env.CHAT_ID;
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
    const text = ctx.message.text;
    if (text === 'hoşgeldin bilal' || text === 'Hoşgeldin bilal' || text === 'Hosgeldin bilal' || text === 'hosgeldin bilal') {
        telegram.sendMessage(chatId, 'Hoşbuldum. Yeni kitabımı okumayı unutmayın :)');
    }
    if (text === 'ya hak' || text === 'Ya hak') {
        telegram.sendPhoto(chatId, { source: 'ya-hak.png' });
    }
});
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map