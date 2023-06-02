import type { FastifyRequest } from 'fastify';

import { TrackService } from '../track.service';
import { GetTrackController } from './get-track.controller';
import type { GetTrackRequest } from './get-track.schema';
import { GetTrackUseCase } from './get-track.use-case';

export const getTrackControllerHandler = (
  req: FastifyRequest<{ Querystring: GetTrackRequest }>
) => {
  const trackService = TrackService.getInstance();
  const getTrackUseCase = GetTrackUseCase.getInstance(trackService);
  const getTrackController = GetTrackController.getInstance(getTrackUseCase);

  return getTrackController.handle(req);
};

export * from './get-track.schema';
