import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import debounce from '@gecut/utilities/debounce.js';
import {hexFromArgb} from '@material/material-color-utilities';
import {styleMap} from 'lit/directives/style-map.js';
import {html} from 'lit/html.js';

import {colorContext} from '../../signal/color.context.js';
import {paletteContext} from '../../signal/palette.context.js';

const colorPickerChange = debounce((event: InputEvent) => {
  const target = event.target as HTMLInputElement;

  const color = colorContext.getValue();

  colorContext.setValue({
    hue: '0',
    lightness: '0',
    saturation: '0',
    ...color,
    [target.name]: target.value.toString(),
  });
}, 1000 / 60);

export function footer() {
  const color = colorContext.getValue();

  return html`
    <footer class="fixed bottom-0 inset-x-0 bg-surfaceContainer translucent flex flex-col p-4">
      <div class="max-w-screen-lg w-full mx-auto flex justify-center items-center gap-4">
        <div class="flex flex-col gap-4">
          <span>Hue:</span>
          <span>Saturation:</span>
          <span>Lightness:</span>
        </div>

        <div class="flex flex-col gap-4 grow">
          <input class="grow" name="hue" type="range" min="0" max="360" value=${color?.hue ?? '0'} @input=${colorPickerChange} />
          <input
            class="grow"
            name="saturation"
            type="range"
            min="0"
            max="100"
            value=${color?.saturation ?? '0'}
            @input=${colorPickerChange}
          />
          <input
            class="grow"
            name="lightness"
            type="range"
            min="0"
            max="100"
            value=${color?.lightness ?? '0'}
            @input=${colorPickerChange}
          />
        </div>

        ${gecutContext(
          colorContext,
          (color) => html`
            <div class="flex flex-col gap-4 min-w-6 text-center">
              <span>${color.hue}</span>
              <span>${color.saturation}%</span>
              <span>${color.lightness}%</span>
            </div>
          `,
        )}

        <div class="flex flex-col gap-2">
          ${gecutContext(
            colorContext,
            (color) => html`
              <div
                class="p-2 w-20 text-center rounded-full shadow-md"
                style=${styleMap({
                  backgroundColor: `hsl(${color.hue},${color.saturation}%,${color.lightness}%)`,
                })}
              >
                HSL
              </div>
            `,
          )}
          ${gecutContext(
            paletteContext,
            (palette) => html`
              <div
                class="p-2 w-20 text-center rounded-full shadow-md"
                style=${styleMap({
                  backgroundColor: `${hexFromArgb(palette.source)}`,
                })}
              >
                Material
              </div>
            `,
          )}
        </div>
      </div>
    </footer>
  `;
}
