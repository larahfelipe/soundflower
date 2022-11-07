import type { Image } from '@/modules/track/track.types';

export const getHQArtworkUrl = (images: Image[], fallback = '') => {
  if (!images.length || !images[images.length - 1]['#text'].length)
    return fallback;

  const highestQualityImage = images[images.length - 1]['#text'];

  return highestQualityImage;
};
