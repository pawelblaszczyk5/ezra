import { useEffect } from 'react';
import type { ActionFunction } from 'remix';
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) return;

    fetcher.submit({ accessToken, refreshToken }, { method: 'post' });
  }, []);
  return <h1>Authorization in progress</h1>;
};

export default Authorize;
