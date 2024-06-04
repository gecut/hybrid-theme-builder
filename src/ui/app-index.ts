import {gecutContext} from '@gecut/lit-helper/directives/context.js';
import {html, render} from 'lit/html.js';

import {footer} from './components/footer.js';
import {header} from './components/header.js';
import './router.js';
import './styles/global.css';
import {routerContext} from '../signal/router.context.js';

document.documentElement.classList.remove('color-scheme-dark');
document.documentElement.classList.add('color-scheme-light');

render(
  html`
    ${header()}
    <main role="main" class="w-full py-20 px-4">${gecutContext(routerContext, (page) => page)}</main>
    ${footer()}
  `,
  document.body,
);
