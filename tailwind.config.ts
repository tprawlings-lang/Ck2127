import type { Config } from 'tailwindcss';

/**
 * CK2717 brand tokens. These are the only place brand colors are defined.
 * See BRAND_IDENTITY.md for the approved palette and usage rules.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          deep: '#233036', // primary headings, footer, dark backgrounds, logo
        },
        sand: '#F4EFE7', // main page background and calm section panels
        sage: '#74877E', // secondary headings, icons, borders, supportive accents
        terracotta: '#C66F4E', // primary buttons, selected states, attention accents
        'terracotta-dark': '#A85A3D', // hover state that keeps AA contrast
        'soft-white': '#FCFBF8', // cards and clean content areas
        body: '#31383C', // primary paragraph text
        muted: '#687277', // secondary information only
        line: '#D8D5CF', // input, card, table, and divider borders
        success: '#557660', // confirmation states and completed steps
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
