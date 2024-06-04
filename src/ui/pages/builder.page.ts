import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {html} from 'lit/html.js';

import {themeContext} from '../../signal/theme.context.js';
import {palettePage} from '../components/palette.page.js';

export function builderPage() {
  return html` ${gecutContext(themeContext, (sourceColor) => palettePage(sourceColor, 'dark'))}`;
}
