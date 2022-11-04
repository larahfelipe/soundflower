import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const trackRequestSchema = z.object({
  q: z.string()
});

const trackResponseSchema = z.object({
  title: z.string(),
  artist: z.string(),
  albumTitle: z.string(),
  albumUrl: z.string(),
  artworkUrl: z.string(),
  artworkColors: z.object({
    Vibrant: z.string(),
    Muted: z.string(),
    DarkVibrant: z.string(),
    DarkMuted: z.string(),
    LightVibrant: z.string(),
    LightMuted: z.string()
  }),
  ytVideoId: z.string()
});

export const { schemas: trackSchemas, $ref } = buildJsonSchemas({
  trackRequestSchema,
  trackResponseSchema
});

export type TrackRequest = z.infer<typeof trackRequestSchema>;

export type TrackResponse = z.infer<typeof trackResponseSchema>;
