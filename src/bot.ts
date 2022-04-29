import { Bot } from 'grammy';
import { Menu } from '@grammyjs/menu';
import { config } from './config';
import { scenes } from './scenes';
import { BotContext } from './types';
import { handleError } from './helpers/error-handler';
import {
	setDefaultLanguage,
	setupI18n,
	setupLogger,
	setupMiddlewareContext,
	setupSession,
} from './middlewares';

export const bot = new Bot<BotContext>(config.BOT_TOKEN);

bot.use(setupSession());
bot.use(setupMiddlewareContext());
bot.use(setupLogger());
bot.use(setupI18n());
bot.use(setDefaultLanguage());
bot.use(scenes.manager());

const notifications = new Set<number>();

function toggleNotifications(id: number) {
	if (!notifications.delete(id)) notifications.add(id);
}

const menu = new Menu('toggle').text(
	(ctx) => (ctx.from && notifications.has(ctx.from.id) ? '🔔' : '🔕'),
	(ctx) => {
		toggleNotifications(ctx.from.id);
		ctx.menu.update(); // update the menu!
	}
);

// Make it interactive.
bot.use(menu);

bot.command('start', async (ctx) => {
	await ctx.reply('Check out this menu:', { reply_markup: menu });
});

bot.command('scene_start', async (ctx) => {
	return await ctx.scenes.enter('main', { title: 'mylord' });
});

// bot.on('message', async (ctx) => {
// 	await ctx.replyWithChatAction('typing');
// 	return await ctx.reply(ctx.i18n.t('welcome'));
// });

bot.use(scenes);

if (config.isDev) {
	bot.catch(handleError);
}
