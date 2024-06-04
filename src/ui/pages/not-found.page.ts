import {gecutButton} from '@gecut/components';
import {html} from 'lit/html.js';

import {resolveRouterPath} from '../router.js';

export function notFoundPage() {
  return html`
    <div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="mt-4 text-headlineLarge font-bold tracking-tight text-onSurface sm:text-5xl">Page not found</h1>
        <p class="mt-6 text-bodyLarge leading-7 text-secondary">Sorry, we couldn’t find the page you’re looking for.</p>
        <div class="mt-10 flex items-center justify-center gap-x-2">
          ${gecutButton({
            type: 'filled',
            label: 'Go To Home',
            href: resolveRouterPath(),
          })}
        </div>
      </div>
    </div>
  `;
}
