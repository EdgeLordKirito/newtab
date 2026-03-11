import adapter from '@sveltejs/adapter-static';
import path from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		//paths: {
		//	base: '/newtab'
		//},
		alias: {
			$lib: path.resolve('./src/lib'),
			$stores: path.resolve('./src/stores'),
			$types: path.resolve('./src/types'),
			$utils: path.resolve('./src/utils'),
			$src: path.resolve('./src')
		}
	}
};

export default config;
