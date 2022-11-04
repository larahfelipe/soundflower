import { config } from 'dotenv';

config();

export const envs = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || '0.0.0.0',
  lastfmApiKey: process.env.LASTFM_API_KEY,
  lastfmApiUrl: 'http://ws.audioscrobbler.com/2.0'
};
