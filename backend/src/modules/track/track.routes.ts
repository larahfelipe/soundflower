import type { FastifyInstance } from 'fastify';

import { $ref, trackControllerHandler } from './';

export const trackRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        querystring: $ref('trackRequestSchema'),
        response: {
          200: $ref('trackResponseSchema')
        }
      }
    },
    trackControllerHandler
  );
};
