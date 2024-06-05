import {map} from '@gecut/lit-helper/utilities/map.js';
import clipboard from '@gecut/utilities/clipboard.js';
import {hexFromArgb, type Theme} from '@material/material-color-utilities';
import {html} from 'lit/html.js';

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
const colors = {
  primary: 'bg-primary text-onPrimary',
  'on primary': 'bg-onPrimary text-primary',
  'primary container': 'bg-primaryContainer text-onPrimaryContainer',
  'on primary container': 'bg-onPrimaryContainer text-primaryContainer',

  secondary: 'bg-secondary text-onSecondary',
  'on secondary': 'bg-onSecondary text-secondary',
  'secondary container': 'bg-secondaryContainer text-onSecondaryContainer',
  'on secondary container': 'bg-onSecondaryContainer text-secondaryContainer',

  tertiary: 'bg-tertiary text-onTertiary',
  'on tertiary': 'bg-onTertiary text-tertiary',
  'tertiary container': 'bg-tertiaryContainer text-onTertiaryContainer',
  'on tertiary container': 'bg-onTertiaryContainer text-tertiaryContainer',

  error: 'bg-error text-onError',
  'on error': 'bg-onError text-error',
  'error container': 'bg-errorContainer text-onErrorContainer',
  'on error container': 'bg-onErrorContainer text-errorContainer',

  background: 'bg-background text-onBackground',
  'on background': 'bg-onBackground text-background',
  surface: 'bg-surface text-onSurface',
  'on surface': 'bg-onSurface text-surface',

  outline: 'bg-outline text-onSurface',
  'outline variant': 'bg-outlineVariant text-onSurface',
  'surface variant': 'bg-surfaceVariant text-onSurfaceVariant',
  'on surface variant': 'bg-onSurfaceVariant text-surfaceVariant',
} as const;

export function paletteSystemColors(
  theme: Theme,
  mode: 'light' | 'dark' = document.documentElement.classList.contains('color-scheme-dark') ? 'dark' : 'light',
) {
  return html`
    <div class="flex flex-wrap">
      ${map(null, Object.keys(colors) as (keyof typeof colors)[], (color: keyof typeof colors) => {
        const scheme = color.split(' ');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const colorName = (scheme[0] + scheme.slice(1).map(capitalize).join('')) as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const colorArgb = (theme.schemes[mode] as any)[colorName];
        const colorHex = hexFromArgb(colorArgb);

        return html`
          <div class="w-1/4 p-2">
            <button
              class="${colors[
                color
              ]} w-full h-full p-2 flex gap-4 flex-col justify-between rounded-lg elevation-0 group hover:elevation-1 transition-shadow"
              @click=${() => clipboard.write(colorHex)}
            >
              <span class="color-inherit text-labelMedium capitalize">${color}</span>
              <span class="color-inherit text-titleSmall opacity-0 group-hover:opacity-75 transition-opacity">${colorHex}</span>
            </button>
          </div>
        `;
      })}
    </div>
  `;
}
