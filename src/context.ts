import { AsyncLocalStorage } from 'async_hooks';

export const middlewareContext = new AsyncLocalStorage<Map<string, any>>();
