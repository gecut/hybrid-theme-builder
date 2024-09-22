import {gecutIconButton} from '@gecut/components';
import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import clipboard from '@gecut/utilities/clipboard.js';
import debounce from '@gecut/utilities/debounce.js';
import {nextIdleCallback} from '@gecut/utilities/wait/polyfill.js';
import {Hct, argbFromHex} from '@material/material-color-utilities';
import {html} from 'lit/html.js';

import {colorContext} from '../../signal/color.context.js';
import {paletteContext} from '../../signal/palette.context.js';
import {themeContext} from '../../signal/theme.context.js';
import {titleContext} from '../../signal/title.context.js';
import darkIcon from '../assets/svg/dark.svg?raw';
import downloadIcon from '../assets/svg/download.svg?raw';
import lightIcon from '../assets/svg/light.svg?raw';
import shareIcon from '../assets/svg/share.svg?raw';

export function header() {
  return html`
    <header class="fixed top-0 inset-x-0 bg-surfaceContainer translucent flex flex-col">
      <div class="max-w-screen-lg mx-auto flex justify-between py-4 gap-4 w-full h-full relative px-4">
        <div class="flex flex-1 justify-start items-center">
          <div class="size-10 rounded-full overflow-hidden m-1">
            <img src="/icon-192-maskable.png" class="rounded-full" />
          </div>
        </div>

        <div class="flex items-center justify-center text-titleLarge text-primary my-auto">
          ${gecutContext(titleContext, (title) => title)}
        </div>

        <div class="flex flex-1 justify-end items-center">
          ${gecutIconButton({
            toggle: true,
            svg: lightIcon,
            selectedIcon: {
              svg: darkIcon,
            },
            events: {
              change: debounce((event: Event) => {
                const target = event.target as HTMLInputElement;
                const checked = target.checked;

                if (checked) {
                  document.documentElement.classList.remove('color-scheme-light');
                  document.documentElement.classList.add('color-scheme-dark');
                }
 else {
                  document.documentElement.classList.remove('color-scheme-dark');
                  document.documentElement.classList.add('color-scheme-light');
                }

                paletteContext.renotify();
              }, 1000 / 30),
            },
          })}
          ${gecutIconButton({
            svg: shareIcon,
            events: {
              click: async (event) => {
                const target = event.target as HTMLElement;
                const color = colorContext.value;

                if (!color) return;

                const params = new URLSearchParams();

                params.set('h', color.hue);
                params.set('s', color.saturation);
                params.set('l', color.lightness);

                const url = location.protocol + '//' + location.hostname + ':' + location.port + '/preview' + '?' + params.toString();

                target.setAttribute('loading', '');

                await clipboard.write(url);

                target.removeAttribute('loading');
              },
            },
          })}
          ${gecutIconButton({
            svg: downloadIcon,
            events: {
              click: (event: Event) => {
                const target = event.target as HTMLElement;
                const download = () =>
                  new Promise<void>((resolve) => {
                    const fileName = 'h' + Math.ceil(Hct.fromInt(argbFromHex(themeContext.value ?? '#000')).hue) + '.css';

                    const a = document.createElement('a'); // Create "a" element
                    const blob = new Blob([':root{', document.documentElement.getAttribute('style') ?? '', '}'], {
                      type: 'text/css',
                    }); // Create a blob (file-like object)
                    const url = URL.createObjectURL(blob); // Create an object URL from blob

                    a.setAttribute('href', url); // Set "a" element link
                    a.setAttribute('download', fileName); // Set download filename

                    setTimeout(() => nextIdleCallback(() => resolve(a.click())), 1024);
                  });

                target.setAttribute('loading', '');

                download().finally(() => {
                  target.removeAttribute('loading');
                });
              },
            },
          })}
        </div>
      </div>
    </header>
  `;
}
