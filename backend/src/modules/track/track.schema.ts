import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const trackRequestSchema = z.object({
  q: z.string()
});

const trackResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.object({
    title: z.string()
  }),
  artwork: z.object({
    url: z.string(),
    colors: z.object({
      Vibrant: z.union([z.string(), z.array(z.number())]),
      Muted: z.union([z.string(), z.array(z.number())]),
      DarkVibrant: z.union([z.string(), z.array(z.number())]),
      DarkMuted: z.union([z.string(), z.array(z.number())])
    })
  })
});

export const { schemas: trackSchemas, $ref } = buildJsonSchemas({
  trackRequestSchema,
  trackResponseSchema
});

export type TrackRequest = z.infer<typeof trackRequestSchema>;

export type TrackResponse = z.infer<typeof trackResponseSchema>;
