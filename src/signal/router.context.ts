import {ContextSignal} from '@gecut/signal';

import type {TemplateResult} from 'lit/html.js';

export const routerContext = new ContextSignal<TemplateResult>('router');
