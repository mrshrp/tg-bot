import { I18n } from '@grammyjs/i18n';

export const i18n = new I18n({
	directory: 'locales',
	defaultLanguageOnMissing: true, // implies allowMissing = true
	defaultLanguage: 'ru',
	useSession: false,
});
