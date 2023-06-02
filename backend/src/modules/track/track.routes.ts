import type { FastifyInstance } from 'fastify';

import { $ref, getTrackControllerHandler } from './get-track';

export const trackRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        querystring: $ref('getTrackRequestSchema'),
        response: {
          200: $ref('getTrackResponseSchema')
        }
      }
    },
    getTrackControllerHandler
  );
};
