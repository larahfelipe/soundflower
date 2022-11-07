import type { FastifyRequest } from 'fastify';

import type { TrackRequest } from './track.schema';
import { TrackService } from './track.service';

export class TrackController {
  private trackService: TrackService;

  constructor(trackService: TrackService) {
    this.trackService = trackService;
  }

  async handle(req: TrackController.Request) {
    const { q } = req.query;

    try {
      const result = await this.trackService.execute({ q });

      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

export namespace TrackController {
  export type Request = FastifyRequest<{ Querystring: TrackRequest }>;
}
