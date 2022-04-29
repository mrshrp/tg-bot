import { bot } from './bot';
import { config } from './config';
import { logger } from './logger';

import { handleGracefulShutdown } from './helpers/graceful-shutdown-handler';
import { pubRedis } from './redis';

if (config.isDev) {
	// Graceful shutdown handlers
	process.once('SIGTERM', handleGracefulShutdown);
	process.once('SIGINT', handleGracefulShutdown);
}

const run = async () => {
	pubRedis.on('connect', () => {
		logger.info('connect to redis');
	});

	pubRedis.subscribe('channel', (err, count) => {
		if (err) {
			// Just like other commands, subscribe() can fail for some reasons,
			// ex network issues.
			console.error('Failed to subscribe: %s', err.message);
		} else {
			// `count` represents the number of channels this client are currently subscribed to.
			console.log(
				`Subscribed successfully! This client is currently subscribed to ${count} channels.`
			);
		}
	});
	pubRedis.on('message', (channel, message) => {
		console.log(`Received ${message} from ${channel}`);
		const data = JSON.parse(message);
		if (data.message !== '')
			bot.api.sendMessage(data.chat_id, `**${data.message}**`);
	});

	if (config.USE_WEBHOOK) {
		// server.listen(config.BOT_SERVER_PORT, '0.0.0.0', () => {
		// 	bot.api
		// 		.setWebhook(config.BOT_WEBHOOK, {
		// 			allowed_updates: config.BOT_ALLOWED_UPDATES,
		// 		})
		// 		.catch((err) => logger.error(err));
		// });
	} else {
		bot.start({
			allowed_updates: config.BOT_ALLOWED_UPDATES,
			onStart: ({ username }) =>
				logger.info({
					msg: 'bot running...',
					username,
				}),
		});
	}
};
run();
