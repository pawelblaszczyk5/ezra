import { createCloudflareKVSessionStorage } from 'remix';
import { USER } from '~/lib/constants';

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

export const isUserAuthenticated = async (
  request: Request,
): Promise<boolean> => {
  const session = await getSession(request.headers.get('cookie'));

  // TODO - handling various scenarios, checking is token proper etc.
  return Boolean(session.get(USER));
};
