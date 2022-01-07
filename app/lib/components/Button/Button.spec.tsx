import { render } from '@testing-library/react';
import { Button } from '~/lib/components/Button/';

describe('test', () => {
  test('placeholder', () => {
    render(<Button />);

    expect(true).toBe(true);
  });
});
