import {ContextSignal} from '@gecut/signal';
import debounce from '@gecut/utilities/debounce.js';
import json from '@gecut/utilities/local-storage-json.js';
import {hexFromArgb, argbFromRgb} from '@material/material-color-utilities';

import {themeContext} from './theme.context.js';

const params = new URLSearchParams(location.search);
const hue = params.get('h');
const saturation = params.get('s');
const lightness = params.get('l');

export type HSLColor = {hue: string; saturation: string; lightness: string};
export const colorContext = new ContextSignal<HSLColor>('color');

colorContext.setValue({
  hue: hue ?? json.get('HTB.HUE', '0'),
  saturation: saturation ?? json.get('HTB.SATURATION', '0'),
  lightness: lightness ?? json.get('HTB.LIGHTNESS', '0'),
});

colorContext.subscribe(
  debounce((color: HSLColor) => {
    const rgb = hslToRgb(Number(color.hue), Number(color.saturation), Number(color.lightness));
    const argb = argbFromRgb(rgb.red, rgb.green, rgb.blue);
    const hex = hexFromArgb(argb);

    themeContext.setValue(hex);

    json.set('HTB.HUE', color.hue);
    json.set('HTB.SATURATION', color.saturation);
    json.set('HTB.LIGHTNESS', color.lightness);
  }, 256),
  {
    priority: 1000,
    receivePrevious: true,
  },
);

function hslToRgb(hue: number, saturation: number, lightness: number) {
  hue = hue % 360; // Ensure hue is in the range of 0 to 360
  const chroma = saturation * Math.min(lightness, 1 - lightness);
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let red = 0,
    green = 0,
    blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = x;
  }
  else if (huePrime >= 1 && huePrime < 2) {
    red = x;
    green = chroma;
  }
  else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = x;
  }
  else if (huePrime >= 3 && huePrime < 4) {
    green = x;
    blue = chroma;
  }
  else if (huePrime >= 4 && huePrime < 5) {
    red = x;
    blue = chroma;
  }
  else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = x;
  }

  const m = lightness - 0.5 * chroma;
  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);

  return {red, green, blue};
}
