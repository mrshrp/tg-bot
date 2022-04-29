import { Context as DefaultContext, SessionFlavor } from 'grammy';
import { I18nContextFlavor } from '@grammyjs/i18n';
import { ScenesFlavor, ScenesSessionFlavor } from 'grammy-scenes';

interface Language {
	languageCode?: string;
}

export type BotContext = DefaultContext &
	SessionFlavor<ScenesSessionFlavor & Language> &
	ScenesFlavor &
	I18nContextFlavor;
