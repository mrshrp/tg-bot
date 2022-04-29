import { bot } from '../bot';
import { logger } from '../logger';
import { pubRedis } from '../redis';

export const handleGracefulShutdown = async () => {
	logger.info('shutdown');

	await bot.stop();
	await pubRedis.quit();
	process.exit();
};
