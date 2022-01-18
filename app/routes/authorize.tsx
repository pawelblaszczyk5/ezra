import type { ActionFunction } from 'remix';
import type { ErrorMessage, User } from '~/lib/model';

import { redirect, useActionData, useFetcher } from 'remix';
import { useEffect, useState } from 'react';
import { commitSession, createErrorMessage, getSession } from '~/lib/helpers';
import { USER } from '~/lib/constants';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accessToken = formData.get('accessToken');
  const refreshToken = formData.get('refreshToken');

  if (!accessToken || typeof accessToken !== 'string' || !refreshToken || typeof refreshToken !== 'string')
    return createErrorMessage({ content: 'Some params from auth are missing, please try again', status: 400 });

  const session = await getSession(request.headers.get('cookie'));
  const user: User = {
    accessToken,
    refreshToken,
  };

  session.set(USER, user);

  return redirect('/app', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

const Authorize = () => {
  const fetcher = useFetcher();
  const [badURL, setBadURL] = useState(false);
  const error = useActionData<ErrorMessage>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) return setBadURL(true);

    fetcher.submit({ accessToken, refreshToken }, { method: 'post' });
  }, []);

  if (badURL) return <p>Some params from auth are missing, please try again</p>;

  if (error) return <p>{error.content}</p>;

  return <h1>Authorization in progress</h1>;
};

export default Authorize;
