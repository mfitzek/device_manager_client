import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


import { ViteAliases  } from 'vite-aliases'


const alias_cfg = {
	dir: 'src',
	prefix: '@',
	deep: true,
	depth: 1,
	allowLogging: false,
	allowGlobalAlias: true,
	adjustDuplicates: false,

	useConfig: true,

	useRelativePaths: true,

	useTypescript: true,

	root: process.cwd()
};



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteAliases(alias_cfg),
    vue({
      template: { transformAssetUrls }
    }),
    quasar()
  ],

  resolve:{
	extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.Vue'],
  },

  server: {
	port: 4000,
	proxy: {
		'/api': {
			target: 'http://localhost:3000',
			changeOrigin: true,
			secure: false,
			ws: true,
			rewrite: (path) => path.replace(/^\/api/, '')
		}
	},
  }

})
