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

export const meta: MetaFunction = () => {
  return { title: 'Ezra - your best app' };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

export default App;
