import Vibrant from 'node-vibrant';

import { validateURL } from './validators';

type RGBVector = [number, number, number];

type Palette = {
  Vibrant: string | RGBVector | null;
  Muted: string | RGBVector | null;
  DarkVibrant: string | RGBVector | null;
  DarkMuted: string | RGBVector | null;
  LightVibrant: string | RGBVector | null;
  LightMuted: string | RGBVector | null;
};

const palette: Palette = {
  Vibrant: null,
  Muted: null,
  DarkVibrant: null,
  DarkMuted: null,
  LightVibrant: null,
  LightMuted: null
};

export const getArtworkPaletteColors = async (artworkUrl: string) => {
  if (!artworkUrl || !validateURL(artworkUrl)) return;

  const paletteColors = await Vibrant.from(artworkUrl).getPalette();
  if (!paletteColors) return {} as any;

  Object.keys(paletteColors).forEach((key) => {
    if (!paletteColors[key]) return;

    palette[key as keyof Palette] = paletteColors[key]!.hex
      ? paletteColors[key]!.hex
      : paletteColors[key]!.rgb;
  });

  return palette;
};
