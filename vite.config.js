import { defineConfig } from 'vite';
import { resolve } from 'path';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

export default defineConfig({
  server: {
    port: 5178,
    strictPort: true
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss',
    lib: {
      entry: resolve(__dirname, 'src/kairos.ts'),
      name: 'Kairos',
      fileName: 'kairos',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name === 'kairos.css') return 'kairos.min.css';
          return assetInfo.name;
        }
      }
    }
  }
});
