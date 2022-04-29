import Redis from 'ioredis';

export const pubRedis = new Redis({
	host: 'localhost',
	port: 6379,
});

export const subRedis = pubRedis.duplicate();
