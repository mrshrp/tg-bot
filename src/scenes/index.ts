import { ScenesComposer } from 'grammy-scenes';

import { BotContext } from '../types';

import { mainScene } from './main';

export const scenes = new ScenesComposer<BotContext>();
scenes.scene(mainScene);
