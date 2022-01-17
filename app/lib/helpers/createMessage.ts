import type { MessageType } from '~/lib/enums';
import type { Message } from '~/lib/model';

import { json } from 'remix';

interface CreateMessageParams extends Message<MessageType> {
  status: number;
}

export const createMessage = ({ content, status, type }: CreateMessageParams) =>
  json({ content, type }, { status });
