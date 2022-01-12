import type { ActionFunction, LoaderFunction } from 'remix';
import type { CustomError } from '~/lib/model';

import { useActionData, redirect, Form } from 'remix';
import { AuthorizationType, isAuthorizationType } from '~/lib/enums';
import { createError } from '~/lib/helpers';
import { commitSession, getSession, supabaseClient } from '~/lib/helpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/lib/constants';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));

  console.log(session.get(ACCESS_TOKEN));

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get('type');

  if (!isAuthorizationType(type)) {
    return createError('Make sure to submit data using provided form', 400);
  }

  switch (type) {
    case AuthorizationType.EMAIL: {
      const email = formData.get('email');
      const password = formData.get('password');

      if (
        !email ||
        typeof email !== 'string' ||
        !password ||
        typeof password !== 'string'
      ) {
        return createError('Fill both fields and submit form again', 400);
      }

      const { data: supabaseSession, error } =
        await supabaseClient.auth.api.signInWithEmail(email, password);

      if (error) {
        return createError(error.message, error.status);
      }

      if (!supabaseSession) {
        return createError('Something went wrong, please try again', 500);
      }

      const { access_token, refresh_token } = supabaseSession;
      const session = await getSession(request.headers.get('cookie'));

      session.set(ACCESS_TOKEN, access_token);
      session.set(REFRESH_TOKEN, refresh_token);

      return redirect('/app', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }

    case AuthorizationType.GITHUB: {
      const url = supabaseClient.auth.api.getUrlForProvider('github', {
        redirectTo: `${new URL(request.url).origin}/authorize`,
      });

      console.log(url);

      return redirect(url);
    }
  }
};

const Login = () => {
  const error = useActionData<CustomError>();

  return (
    <>
      <Form
        method="post"
        className="flex flex-col max-w-3xl items-center justify-center mx-auto"
        noValidate
      >
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button name="type" value={AuthorizationType.EMAIL}>
          Login with email and password
        </button>
      </Form>
      <Form
        method="post"
        className="flex flex-col max-w-3xl items-center justify-center mx-auto"
      >
        <button name="type" value={AuthorizationType.GITHUB}>
          Login with github
        </button>
      </Form>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Login;