export const enum AuthorizationType {
  EMAIL = 'EMAIL',
  GITHUB = 'GITHUB',
}

export const isAuthorizationType = (
  argument: unknown,
): argument is AuthorizationType => {
  return (
    typeof argument === 'string' &&
    (argument === AuthorizationType.EMAIL ||
      argument === AuthorizationType.GITHUB)
  );
};
