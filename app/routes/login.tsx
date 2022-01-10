import type { ActionFunction } from 'remix';
import type { CustomError } from '~/lib/model';

import { useActionData, redirect, Form } from 'remix';
import { AuthorizationType, isAuthorizationType } from '~/lib/enums';
import { createError } from '~/lib/helpers';
import { supabaseClient } from '~/lib/constants';

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

      const { session, error } = await supabaseClient.auth.signIn({
        email,
        password,
      });

      if (error) {
        return createError(error.message, error.status);
      }

      if (!session) {
        return createError('Something went wrong, please try again', 500);
      }

      const { access_token, refresh_token } = session;

      return redirect('/app');
    }

    case AuthorizationType.GITHUB: {
      const { error, url } = await supabaseClient.auth.signIn(
        {
          provider: 'github',
        },
        {
          redirectTo: `${new URL(request.url).origin}/authorize`,
        },
      );

      if (error) {
        return createError(error.message, error.status);
      }

      if (!url) {
        return createError('Something went wrong, please try again', 500);
      }

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
