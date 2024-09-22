// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(globalThis as any).URLPattern) {
  await import('urlpattern-polyfill');
}

import debounce from '@gecut/utilities/debounce.js';
import {redirect} from '@thepassle/app-tools/router/plugins/redirect.js';
import {resetFocus} from '@thepassle/app-tools/router/plugins/resetFocus.js';
import {Router} from '@thepassle/app-tools/router.js';

import {notFoundPage} from './pages/not-found.page.js';
import {palettePage} from './pages/palette.page.js';
import {previewPage} from './pages/preview.page.js';
import {routerContext} from '../signal/router.context.js';
import {titleContext} from '../signal/title.context.js';

export const router = new Router({
  plugins: [resetFocus],
  fallback: '/404',
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Home',
      plugins: [redirect(resolveRouterPath('palette'))],
    },

    {
      path: resolveRouterPath('palette'),
      title: 'Palette',
      render: palettePage,
    },

    {
      path: resolveRouterPath('preview'),
      title: 'Preview',
      render: previewPage,
    },

    {
      path: resolveRouterPath('404'),
      title: '404',
      render: notFoundPage,
    },
  ],
});

export function resolveRouterPath(unresolvedPath?: string) {
  let resolvedPath = import.meta?.env?.BASE_URL ?? '/';

  if (unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }

  return resolvedPath;
}

export const debouncedRender = debounce(() => {
  routerContext.value = router.render();
  titleContext.value = router.context.title;
}, 1000 / 60);

router.addEventListener('route-changed', debouncedRender);
