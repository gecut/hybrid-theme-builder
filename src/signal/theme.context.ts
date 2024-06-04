import {ContextSignal} from '@gecut/signal';
import {argbFromHex, themeFromSourceColor} from '@material/material-color-utilities';

import {paletteContext} from './palette.context.js';
import {cssFromSourceColor} from '../utilities/css-from-source-color.js';

export const themeContext = new ContextSignal<string>('theme');

themeContext.subscribe((sourceColor) => {
  for (const [key, color] of Object.entries(cssFromSourceColor(sourceColor))) {
    document.documentElement.style.removeProperty(key);
    document.documentElement.style.setProperty(key, color);
  }

  paletteContext.setValue(themeFromSourceColor(argbFromHex(sourceColor)));
});
