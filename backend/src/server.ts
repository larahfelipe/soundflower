import cors from '@fastify/cors';
import fastify from 'fastify';

import { trackRoutes, trackSchemas } from '@/modules';

export const makeServer = async () => {
  const server = fastify({
    logger: true
  });

  await server.register(cors, {
    origin: true
  });

  await server.register(trackRoutes, { prefix: 'api/v1/track' });

  const schemas = [...trackSchemas];
  schemas.forEach((schema) => server.addSchema(schema));

  server.get('/api/health', () => ({
    status: 'OK'
  }));

  return server;
};
