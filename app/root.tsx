import type { LinksFunction, MetaFunction } from 'remix';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import styles from '~/index.css';
import { ThemeSetter } from '~/lib/components/ThemeSetter';

export const meta: MetaFunction = () => {
  return { title: 'Ezra - your best app' };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
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
    <body className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

export default App;
