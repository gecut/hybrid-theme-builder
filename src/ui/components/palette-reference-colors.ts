import {mapObject} from '@gecut/lit-helper/utilities/map-object.js';
import {html} from 'lit/html.js';

const themeScheme: Record<'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error' | 'neutral-variant', number[]> = {
  primary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
  secondary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
  tertiary: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
  neutral: [0, 4, 6, 10, 12, 17, 20, 22, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100],
  'neutral-variant': [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
  error: [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100],
};

export function paletteReferenceColors() {
  return html`
    <div class="flex flex-col gap-2 px-2">
      ${mapObject(
        null,
        themeScheme,
        (tones, key) => html`
          <h2 class="text-titleMedium text-onSurfaceVariant capitalize mt-4">${key}</h2>
          <div class="flex rounded-md overflow-hidden shadow">
            ${tones.map(
              (tone, index) => html`
                <div
                  class="h-12 grow text-bodySmall flex items-center justify-center"
                  style="background-color:rgb(var(--ref-palette-${key + tone}));"
                >
                  <span class="hidden md:inline" style="color:rgb(var(--ref-palette-${key + tones[tones.length - 1 - index]}));">
                    ${tone}
                  </span>
                </div>
              `,
            )}
          </div>
        `,
      )}
    </div>
  `;
}
