import { BotError } from 'grammy';
import { BotContext } from '../types';
import { logger } from '../logger';

export const handleError = async (error: BotError<BotContext>) => {
	const { ctx } = error;
	const err = error.error;
	logger.error({
		update_id: ctx.update.update_id,
		err,
	});
};
