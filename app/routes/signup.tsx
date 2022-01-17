import type { ActionFunction, LoaderFunction } from 'remix';
import type { Message } from '~/lib/model';
import type { MessageType } from '~/lib/enums';

import { redirect, useActionData, Form } from 'remix';
import {
  createErrorMessage,
  createSuccessMessage,
  createUnexpectedErrorMessage,
  getRedirectURL,
  isUserAuthenticated,
  supabaseClient,
} from '~/lib/helpers';
import { isErrorMessage } from '~/lib/model';

export const loader: LoaderFunction = async ({ request }) => {
  if (await isUserAuthenticated(request)) {
    return redirect('/app');
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');

  if (
    typeof email !== 'string' ||
    !email ||
    typeof password !== 'string' ||
    !password ||
    typeof confirmPassword !== 'string' ||
    !confirmPassword
  )
    return createErrorMessage({
      content: 'Make sure all fields all filled',
      status: 400,
    });

  if (password !== confirmPassword)
    return createErrorMessage({
      content: 'Make sure passwords are the same',
      status: 400,
    });

  // Types suggest that this could return session, but with email confirmation turned on it's not possible
  const { user, error } = await supabaseClient.auth.signUp(
    { email, password },
    { redirectTo: getRedirectURL(request) },
  );

  if (error)
    return createErrorMessage({
      content: error.message,
      status: error.status,
    });

  if (user)
    return createSuccessMessage({
      content: `Success, if this e-mail isn't used already you should recieve confirmation e-mail`,
      status: 200,
    });

  return createUnexpectedErrorMessage();
};

const SignUp = () => {
  const message = useActionData<Message<MessageType.ERROR | MessageType.SUCCESS>>();

  return (
    <>
      <Form method="post" noValidate>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <input type="password" name="confirm_password" required />
        <button>Sign Up</button>
      </Form>
      {message && (
        <p>
          {isErrorMessage(message) ? `(Error) ${message.content}` : `(Success) ${message.content}`}
        </p>
      )}
    </>
  );
};

export default SignUp;
