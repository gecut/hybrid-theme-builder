import {ContextSignal} from '@gecut/signal';

import type {Theme} from '@material/material-color-utilities';

export const paletteContext = new ContextSignal<Theme>('palette');
