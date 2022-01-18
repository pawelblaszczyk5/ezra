import type { ActionFunction } from 'remix';

import { useEffect, useState } from 'react';
import { useFetcher } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accessToken = formData.get('accessToken');
  const refreshToken = formData.get('refreshToken');

  console.log(accessToken, refreshToken);
  return null;
};

const Authorize = () => {
  const fetcher = useFetcher();
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) return setError(true);

    fetcher.submit({ accessToken, refreshToken }, { method: 'post' });
  }, []);

  if (error) return <p>Some params from auth are missing, please try again</p>;

  return <h1>Authorization in progress</h1>;
};

export default Authorize;
