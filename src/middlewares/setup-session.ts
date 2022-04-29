import { Context, session, SessionFlavor } from 'grammy';
import { FileAdapter } from '@satont/grammy-file-storage';
import { ScenesFlavor, ScenesSessionFlavor } from 'grammy-scenes';

export const middleware = () => {
	return session<
		ScenesSessionFlavor,
		Context & SessionFlavor<ScenesSessionFlavor> & ScenesFlavor
	>({
		initial: () => ({}),
		storage: new FileAdapter({
			dirName: 'sessions',
		}),
	});
};
