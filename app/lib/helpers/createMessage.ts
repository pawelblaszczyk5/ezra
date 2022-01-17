import type { Message } from '~/lib/model';

import { json } from 'remix';
import { MessageType } from '~/lib/enums';

interface CreateMessageParams extends Message<MessageType> {
  status: number;
}

type CreateTypedMessageParams = Omit<CreateMessageParams, 'type'>;

const createMessage = ({ content, status, type }: CreateMessageParams) => json({ content, type }, { status });

export const createErrorMessage = ({ content, status }: CreateTypedMessageParams) =>
  createMessage({ content, status, type: MessageType.ERROR });

export const createWarningMessage = ({ content, status }: CreateTypedMessageParams) =>
  createMessage({ content, status, type: MessageType.WARNING });

export const createSuccessMessage = ({ content, status }: CreateTypedMessageParams) =>
  createMessage({ content, status, type: MessageType.SUCCESS });

export const createInfoMessage = ({ content, status }: CreateTypedMessageParams) =>
  createMessage({ content, status, type: MessageType.INFO });

export const createUnexpectedErrorMessage = () =>
  createErrorMessage({
    content: 'Something went wrong, please try again',
    status: 500,
  });
