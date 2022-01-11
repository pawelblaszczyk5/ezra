import { createCloudflareKVSessionStorage } from 'remix';

export const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    cookie: {
      name: 'SESSION_ID',
      secrets: [COOKIE_SECRET],
      secure: true,
      sameSite: 'strict',
    },
    kv: SESSIONS_KV,
  });
