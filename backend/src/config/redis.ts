import Redis from 'ioredis';

import { envs } from './envs';

const redisClient = envs.redisEnabled ? new Redis() : null;

export const redis = {
  getData: async (key: string) => {
    if (!redisClient) return null;

    const data = await redisClient.get(key);

    return data;
  },
  setData: async (key: string, value: unknown) => {
    if (!redisClient) return null;

    await redisClient.set(key, JSON.stringify(value));
  }
};
