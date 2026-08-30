// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { execSync } from 'node:child_process';

import expressiveCode from "astro-expressive-code";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeWrap from 'rehype-wrap-all';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

// https://astro.build/config
export default defineConfig({
  site: 'https://forcequit.cc',

  vite: {
      server: {
          allowedHosts: true
      },
      define: {
          __COMMIT_HASH__: JSON.stringify(commitHash)
      }
  },

  fonts: [
      {
          provider: fontProviders.fontsource(),
          name: "Space Grotesk",
          cssVariable: "--font-space-grotesk",
          weights: ["300 700"],
      },
      {
          provider: fontProviders.fontsource(),
          name: "Azeret Mono",
          cssVariable: "--font-azaret-mono",
          weights: ["100 900"],
      }
  ],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { ariaHidden: 'true', tabIndex: -1 } }],
      [rehypeWrap, { selector: 'table', wrapper: 'div.table-wrap' }],
    ],
  },

  integrations: [expressiveCode({
      themes: ['github-light', 'github-dark'],
      styleOverrides: {
            codeFontFamily: 'var(--font-azaret-mono)',
            borderRadius: '8px',
            frames: {
                frameBoxShadowCssValue: 'none',
            },
        },
  })]
});