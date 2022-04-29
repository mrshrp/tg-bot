import { bot } from '../bot';
import { logger } from '../logger';

export const handleGracefulShutdown = async () => {
	logger.info('shutdown');

	await bot.stop();

	process.exit();
};
