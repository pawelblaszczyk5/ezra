import { Form } from 'remix';

const Register = () => (
  <Form>
    <input type="email" name="email" />
    <input type="password" name="password" />
    <input type="password" name="confirm_password" />
  </Form>
);

export default Register;
