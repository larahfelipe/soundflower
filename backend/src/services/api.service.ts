import axios from 'axios';

import { envs } from '../config/envs';

export const api = axios.create({
  baseURL: envs.lastfmApiUrl,
  params: {
    api_key: envs.lastfmApiKey,
    format: 'json'
  }
});
