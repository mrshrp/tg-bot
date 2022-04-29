import { cleanEnv, str, bool, json } from 'envalid';
import 'dotenv/config';

console.log(process.env.NODE_ENV);

export const config = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'production'] }),
	LOG_LEVEL: str({
		choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
		default: 'debug',
	}),
	USE_WEBHOOK: bool({
		default: false,
	}),
	// DATABASE_URL: str(),
	// REDIS_URL: str(),
	// BOT_SERVER_HOST: str({
	// 	default: '0.0.0.0',
	// }),
	// BOT_SERVER_PORT: num({
	// 	default: 80,
	// }),
	BOT_ALLOWED_UPDATES: json({
		default: [],
	}),
	BOT_TOKEN: str(),
	// BOT_WEBHOOK: str(),
	// BOT_ADMIN_USER_ID: num(),
});
