import type { LinksFunction, MetaFunction } from 'remix';

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import styles from '~/index.css';
import fontsStyles from '~/fonts.css';
import { ThemeSetter } from '~/lib/components/ThemeSetter';

export const meta: MetaFunction = () => {
  return { title: 'Ezra - your best app' };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: fontsStyles },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/manrope-latin-400-normal.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    // TODO: Add more fonts based on usage
  ];
};

const App = () => (
  // Supressing warning because of adding class in ThemeSetter
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <ThemeSetter />
      <Meta />
      <Links />
    </head>
    <body className="font-sans bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

export default App;
