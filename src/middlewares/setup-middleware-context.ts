import { NextFunction } from 'grammy';

import { middlewareContext } from '../context';
import { BotContext } from '../types';

export const middleware = () => (ctx: BotContext, next: NextFunction) => {
	const store = new Map();
	return middlewareContext.run(store, next);
};
