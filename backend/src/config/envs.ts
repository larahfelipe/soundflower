import { config } from 'dotenv';

config();

export const envs = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  lastfmApiKey: process.env.LASTFM_API_KEY,
  lastfmApiUrl: 'http://ws.audioscrobbler.com/2.0',
  redisEnabled: process.env.REDIS_ENABLED === 'true',
  redisTrackKey: 'track'
};
