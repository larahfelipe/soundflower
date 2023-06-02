import cors from '@fastify/cors';
import Fastify from 'fastify';

import { getTrackSchemas, trackRoutes } from '@/modules';

import { envs } from './envs';

export const makeApp = async () => {
  const app = Fastify({ logger: envs.loggerEnabled });

  await app.register(cors, { origin: true });

  await app.register(trackRoutes, { prefix: 'api/v1/track' });

  const schemas = [...getTrackSchemas];
  schemas.forEach((schema) => app.addSchema(schema));

  app.get('/api/health', () => ({ status: 'OK' }));

  return app;
};
