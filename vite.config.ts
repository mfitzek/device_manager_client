import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


import { ViteAliases  } from 'vite-aliases'


const alias_cfg = {
	/**
	 * Relative path to the project Directory
	 */
	dir: 'src',

	/**
	 * Prefix Symbol for the Aliases
	 */
	prefix: '@',

	/**
	 * Allow Searching for Subdirectories
	 */
	deep: true,

	/**
	 * Search Depthlevel for Subdirectories
	 */
	depth: 1,

	/**
	 * Creates a Logfile in `logs` Folder
	 * Will be relative to project Directory
	 */
	allowLogging: false,

	/**
	 * Allow global project Directory alias
	 */
	allowGlobalAlias: true,

	/**
	 * Turns Duplicates into camelCased Path Aliases
	 */
	adjustDuplicates: false,

	/**
	 * Generates Paths in IDE Config File
	 * Works with JS oder TS
	 * For Typescript: set `useTypescript` true
	 */
	useConfig: true,

	/**
	 * Used Paths in JS/TS Configs will now be relative to baseUrl
	 */

	useRelativePaths: true,

	/**
	 * Will generate Paths in tsconfig
	 * Used in Combination with `useConfig`
	 */
	useTypescript: true,

	/**
	 * Root path of Vite project
	 */
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
	extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
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
