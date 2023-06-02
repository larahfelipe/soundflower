import type { FastifyRequest } from 'fastify';

import type { GetTrackRequest } from './get-track.schema';
import { GetTrackUseCase } from './get-track.use-case';

export class GetTrackController {
  private static INSTANCE: GetTrackController;

  private constructor(private readonly getTrackUseCase: GetTrackUseCase) {}

  static getInstance(getTrackUseCase: GetTrackUseCase) {
    if (!GetTrackController.INSTANCE)
      GetTrackController.INSTANCE = new GetTrackController(getTrackUseCase);

    return GetTrackController.INSTANCE;
  }

  async handle(req: GetTrackController.Request) {
    const { q } = req.query;

    try {
      const result = await this.getTrackUseCase.get({ q });

      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

export namespace GetTrackController {
  export type Request = FastifyRequest<{ Querystring: GetTrackRequest }>;
}
