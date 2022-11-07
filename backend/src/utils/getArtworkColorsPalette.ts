import Vibrant from 'node-vibrant';

import { isValidURL } from './validators';

type RGBVector = [number, number, number];

type VibrantPalette = Record<'hex' | 'rgb', string | RGBVector>;

type Palette = {
  Vibrant: string | RGBVector;
  Muted: string | RGBVector;
  DarkVibrant: string | RGBVector;
  DarkMuted: string | RGBVector;
};

export const getArtworkColorsPalette = async (artworkUrl: string) => {
  const rawPalette: Palette = {
    Vibrant: '',
    Muted: '',
    DarkVibrant: '',
    DarkMuted: ''
  };

  if (!artworkUrl || !isValidURL(artworkUrl)) return {} as Palette;

  const vibrantPalette = await Vibrant.from(artworkUrl).getPalette();
  if (!vibrantPalette) return rawPalette;

  const palette = Object.keys(vibrantPalette).reduce((acc, curr) => {
    if (!vibrantPalette[curr]) return acc;

    const { hex, rgb } = vibrantPalette[curr] as VibrantPalette;

    acc[curr as keyof Palette] = hex || rgb;

    return acc;
  }, rawPalette);

  return palette;
};
