import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const getTrackRequestSchema = z.object({
  q: z.string()
});

const getTrackResponseSchema = z.object({
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

export const { schemas: getTrackSchemas, $ref } = buildJsonSchemas({
  getTrackRequestSchema,
  getTrackResponseSchema
});

export type GetTrackRequest = z.infer<typeof getTrackRequestSchema>;

export type GetTrackResponse = z.infer<typeof getTrackResponseSchema>;
