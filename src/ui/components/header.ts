import {gecutIconButton} from '@gecut/components';
import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import clipboard from '@gecut/utilities/clipboard.js';
import {html} from 'lit/html.js';

import {colorContext} from '../../signal/color.context.js';
import {titleContext} from '../../signal/title.context.js';
import shareIcon from '../assets/svg/share.svg?raw';

export function header() {
  return html`
    <header class="fixed top-0 inset-x-0 bg-surfaceContainer translucent flex flex-col">
      <div class="max-w-screen-sm mx-auto flex justify-between py-4 gap-4 w-full h-full relative px-4">
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
            svg: shareIcon,
            events: {
              click: async (event) => {
                const target = event.target as HTMLElement;
                const color = colorContext.getValue();

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
        </div>
      </div>
    </header>
  `;
}
