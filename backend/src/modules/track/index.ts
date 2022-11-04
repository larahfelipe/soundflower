import { TrackController } from './track.controller';
import { TrackService } from './track.service';

export const trackControllerHandler = (req: TrackController.Request) => {
  const trackService = new TrackService();
  const trackController = new TrackController(trackService);

  return trackController.handle(req);
};

export * from './track.routes';
export * from './track.schema';
