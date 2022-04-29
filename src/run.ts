import { bot } from './bot';
import { config } from './config';
import { logger } from './logger';

import { handleGracefulShutdown } from './helpers/graceful-shutdown-handler';

if (config.isDev) {
	// Graceful shutdown handlers
	process.once('SIGTERM', handleGracefulShutdown);
	process.once('SIGINT', handleGracefulShutdown);
}

const run = async () => {
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
