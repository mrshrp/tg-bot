import { NextFunction } from 'grammy';
import { BotContext } from '../types';
import { middlewareContext } from '../context';
import { rawLogger } from '../logger';

export const middleware = () => (ctx: BotContext, next: NextFunction) => {
	middlewareContext.getStore()?.set(
		'logger',
		rawLogger.child({
			// updateId: ctx.update.update_id,
		})
	);

	return next();
};
