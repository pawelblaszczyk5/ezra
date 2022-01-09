import type { Theme } from '~/lib/enums';

declare interface Request {
  cf: IncomingRequestCfProperties;
}

declare global {
  interface Window {
    setTheme: (newTheme: Theme) => void;
  }
}
