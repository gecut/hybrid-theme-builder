import {gecutButton} from '@gecut/components';
import {html} from 'lit/html.js';

export function previewPage() {
  return html`
    <div class="flex flex-col py-4 gap-8">
      <div class="flex flex-wrap gap-4 items-center justify-center">
        ${gecutButton({
          type: 'elevated',
          label: 'Elevated',
        })}
        ${gecutButton({
          type: 'filled',
          label: 'Filled',
        })}
        ${gecutButton({
          type: 'filledTonal',
          label: 'Filled Tonal',
        })}
        ${gecutButton({
          type: 'outlined',
          label: 'Outlined',
        })}
        ${gecutButton({
          type: 'text',
          label: 'Text',
        })}
      </div>
    </div>
  `;
}
