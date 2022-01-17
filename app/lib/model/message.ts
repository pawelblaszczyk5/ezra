import { MessageType } from '~/lib/enums';

export interface Message<T extends MessageType> {
  content: string;
  type: T;
}

export type ErrorMessage = Message<MessageType.ERROR>;

export type SuccessMessage = Message<MessageType.SUCCESS>;

export type InfoMessage = Message<MessageType.INFO>;

export type WarningMessage = Message<MessageType.WARNING>;

export const isErrorMessage = (
  message: Message<MessageType>,
): message is ErrorMessage => message.type === MessageType.ERROR;

export const isSuccessMessage = (
  message: Message<MessageType>,
): message is SuccessMessage => message.type === MessageType.SUCCESS;

export const isWarningMessage = (
  message: Message<MessageType>,
): message is WarningMessage => message.type === MessageType.WARNING;

export const isInfoMessage = (
  message: Message<MessageType>,
): message is InfoMessage => message.type === MessageType.INFO;
