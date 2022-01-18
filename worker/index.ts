import { createEventHandler } from '@remix-run/cloudflare-workers';
import * as build from '../build';

declare global {
  const TEST: KVNamespace;
}

addEventListener('fetch', createEventHandler({ build }));
