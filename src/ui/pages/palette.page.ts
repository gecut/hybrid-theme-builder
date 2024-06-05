import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {html} from 'lit/html.js';

import {paletteContext} from '../../signal/palette.context.js';
import {paletteReferenceColors} from '../components/palette-reference-colors.js';
import {paletteSystemColors} from '../components/palette-system-colors.js';

export function palettePage() {
  return html`
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-headlineSmall text-onSurface">System Colors</h1>
      ${gecutContext(paletteContext, (theme) => paletteSystemColors(theme))}

      <h1 class="text-headlineSmall text-onSurface">Reference Colors</h1>
      ${paletteReferenceColors()}
    </div>
  `;
}
