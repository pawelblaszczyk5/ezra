import type { ActionFunction, LoaderFunction } from 'remix';
import type { Message, User } from '~/lib/model';
import type { Provider } from '@supabase/supabase-js';
import type { MessageType } from '~/lib/enums';

import { useActionData, redirect, Form } from 'remix';
import { AuthorizationType, isAuthorizationType } from '~/lib/enums';
import {
  createErrorMessage,
  getProvider,
  commitSession,
  getSession,
  supabaseClient,
  isUserAuthenticated,
  getRedirectURL,
  createUnexpectedErrorMessage,
} from '~/lib/helpers';
import { USER } from '~/lib/constants';

export const loader: LoaderFunction = async ({ request }) => {
  if (await isUserAuthenticated(request)) return redirect('/app');

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get('type');

  if (!isAuthorizationType(type))
    return createErrorMessage({
      content: 'Make sure to submit data using provided form',
      status: 400,
    });

  switch (type) {
    case AuthorizationType.EMAIL: {
      const email = formData.get('email');
      const password = formData.get('password');

      if (!email || typeof email !== 'string' || !password || typeof password !== 'string')
        return createErrorMessage({
          content: 'Fill both fields and submit form again',
          status: 400,
        });

      const { data: supabaseSession, error } = await supabaseClient.auth.api.signInWithEmail(email, password);

      if (error)
        return createErrorMessage({
          content: error.message,
          status: error.status,
        });

      if (!supabaseSession) return createUnexpectedErrorMessage();

      const session = await getSession(request.headers.get('cookie'));
      const { access_token: accessToken, refresh_token: refreshToken } = supabaseSession;
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
    }

    default: {
      const provider: Provider = getProvider(type);

      const url = supabaseClient.auth.api.getUrlForProvider(provider, {
        redirectTo: getRedirectURL(request),
      });

      return redirect(url);
    }
  }
};

const Login = () => {
  const errorMessage = useActionData<Message<MessageType.ERROR>>();

  return (
    <>
      <Form method="post" className="flex flex-col max-w-3xl items-center justify-center mx-auto" noValidate>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button name="type" value={AuthorizationType.EMAIL}>
          Login with email and password
        </button>
      </Form>
      <Form method="post" className="flex flex-col max-w-3xl items-center justify-center mx-auto">
        <button name="type" value={AuthorizationType.GITHUB}>
          Login with Github
        </button>
      </Form>
      <Form method="post" className="flex flex-col max-w-3xl items-center justify-center mx-auto">
        <button name="type" value={AuthorizationType.SPOTIFY}>
          Login with Spotify
        </button>
      </Form>
      <Form method="post" className="flex flex-col max-w-3xl items-center justify-center mx-auto">
        <button name="type" value={AuthorizationType.GITLAB}>
          Login with GitLab
        </button>
      </Form>
      {errorMessage && <p>{errorMessage.content}</p>}
    </>
  );
};

export default Login;
