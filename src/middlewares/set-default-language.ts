import { NextFunction } from 'grammy';
import { BotContext } from '../types';

export const middleware = () => async (ctx: BotContext, next: NextFunction) => {
	if (ctx.from?.is_bot === false) {
		const languageCode = ctx.from.language_code;
		if (!ctx.session.languageCode) {
			ctx.session.languageCode = languageCode || 'ru';
		}
		ctx.i18n.locale(ctx.session.languageCode);
	}

	return next();
};
