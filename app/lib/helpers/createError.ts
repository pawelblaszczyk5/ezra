import { json } from 'remix';

export const createError = (message: string, status: number) =>
  json({ message }, { status });
