import { createEventHandler } from '@remix-run/cloudflare-workers';

// @ts-expect-error import from remix build output is not typed
import * as build from '../build';

declare global {
  const TEST: KVNamespace;
}

addEventListener('fetch', createEventHandler({ build }));
