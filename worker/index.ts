import { createEventHandler } from '@remix-run/cloudflare-workers';

// @ts-expect-error import from remix build otput in worker
import * as build from '../build';

declare global {
  const TEST: KVNamespace;
}

addEventListener('fetch', createEventHandler({ build }));
