export const plugins = {
  'tailwindcss/nesting': {},
  tailwindcss: {},
  autoprefixer: {},
  cssnano: {
    preset: ['cssnano-preset-advanced', {discardComments: {removeAll: true}}],
  },
  'postcss-import': {
    root: 'src/ui/styles',
  },
};
export default {plugins};
