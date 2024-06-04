import {argbFromHex, rgbaFromArgb, themeFromSourceColor} from '@material/material-color-utilities';

export function cssFromSourceColor(sourceColor: string) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));
  const cssTheme: Record<string, string> = {};

  for (const [key, palette] of Object.entries(theme.palettes)) {
    const paletteKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() as
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'neutral'
      | 'neutral-variant'
      | 'error';

    const themeScheme: Record<typeof paletteKey, number[]> = {
      primary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
      secondary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
      tertiary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
      neutral: [0, 4, 6, 10, 12, 17, 20, 22, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100],
      'neutral-variant': [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
      error: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
    };

    for (const tone of themeScheme[paletteKey]) {
      const token = `--ref-palette-${paletteKey}${tone}`;
      const color = rgbaFromArgb(palette.tone(tone));

      cssTheme[token] = `${color.r}, ${color.g}, ${color.b}`;
    }
  }

  return cssTheme;
}
