import {ContextSignal} from '@gecut/signal';
import debounce from '@gecut/utilities/debounce.js';
import json from '@gecut/utilities/local-storage-json.js';
import * as chroma from 'chroma.ts';

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
    const hex = chroma.hsl(Number(color.hue), Number(color.saturation) / 100, Number(color.lightness) / 100).hex('rgb');
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
