import type { LoaderFunction } from 'remix';

import { useLoaderData } from 'remix';
import { json } from 'remix';

export const loader: LoaderFunction = async ({ request }) => {
  return json(request.cf);
};

const Index = () => {
  const x = useLoaderData();

  return <pre>{JSON.stringify(x, null, 2)}</pre>;
};

export default Index;
