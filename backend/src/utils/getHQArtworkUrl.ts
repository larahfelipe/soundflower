import type { Image } from '@/modules/track/track.types';

export const getHQArtworkUrl = (images: Image[]) => {
  if (!images.length) return '';

  const highestQualityImage = images[images.length - 1]['#text'];

  return highestQualityImage;
};
