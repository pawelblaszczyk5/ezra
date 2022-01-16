import type { ActionFunction, LoaderFunction } from 'remix';

import { redirect } from 'remix';
import { Form } from 'remix';
import { isUserAuthenticated } from '~/lib/helpers';

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

  console.log(email, password, confirmPassword);

  return null;
};

const Register = () => (
  <Form method="post" noValidate>
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <input type="password" name="confirm_password" required />
    <button>Register</button>
  </Form>
);

export default Register;
