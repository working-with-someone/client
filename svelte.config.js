import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const cspConfig = {
	directives : {
		"default-src": ["self", "https://*.wws.com"],
		"style-src": ["https://fonts.googleapis.com"],
		"font-src": ["https://fonts.gstatic.com"],
		"img-src": ["self", "https://*.wws.com", "data:", "*"],
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			out : "build",
			
		}),
		csp: process.env.NODE_ENV == "production" ? cspConfig : undefined

	},
	onwarn: (warning, handler) => {
    if (warning.code.startsWith("a11y-")) return;
    handler(warning);
  },
};

export default config;
