import { Scene } from 'grammy-scenes';
import { BotContext } from '../types';

export const mainScene = new Scene<BotContext>('main');

mainScene.use((ctx, next) => {
	console.log('Bot', ctx.i18n.t('welcome'));
	return next();
});

mainScene.do(async (ctx) => {
	if (ctx.session.message_id) {
		try {
			await ctx.api.deleteMessage(ctx.chat?.id ?? '', ctx.session.message_id);
			delete ctx.session.message_id;
		} catch (error) {
			console.log(error);
		}
	}
	await ctx.reply(`Enter your name, ${ctx.scene.arg?.title || 'mortal'}:`);
});

mainScene.wait().on('message:text', async (ctx) => {
	const name = ctx.message.text;

	if (name.toLowerCase() === 'john') {
		await ctx.reply(`Welcome, ${name}`);
		ctx.scene.resume();
	} else {
		await ctx.reply(`${name}, you are not welcome here.`);
	}
});

mainScene.label('start');
// mainScene.call('captcha');

mainScene.do(async (ctx) => {
	const m = await ctx.reply(`Please chose:`, {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: 'Start ovet', callback_data: 'start' },
					{ text: 'Add item', callback_data: 'add_item' },
					{ text: 'Exit', callback_data: 'exit' },
				],
			],
		},
	});

	ctx.session.message_id = m.message_id;
});

mainScene.wait().on('callback_query:data', async (ctx) => {
	await ctx.answerCallbackQuery();
	const choice = ctx.callbackQuery.data;
	if (choice === 'start') {
		// Jump to the label marked above.
		ctx.scene.call('main');
	} else if (choice === 'add_item') {
		// Conditionally call a nested scene.
		// Implies automatic resume after the nested scene completes.
		// ctx.scene.call('add_item');
	} else if (choice === 'exit') {
		// Exit scene, don't call next middleware.
		if (ctx.session.message_id) {
			try {
				await ctx.api.deleteMessage(ctx.chat?.id ?? '', ctx.session.message_id);
				delete ctx.session.message_id;
			} catch (error) {
				console.log(error);
			}
		}
		ctx.scene.exit();
		await ctx.reply('Main scene finished');
	}
});

// mainScene.do((ctx) => ctx.reply('Main scene finished'));
