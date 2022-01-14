export const enum AuthorizationType {
  EMAIL = 'EMAIL',
  GITHUB = 'GITHUB',
  SPOTIFY = 'SPOTIFY',
}

export const isAuthorizationType = (
  argument: unknown,
): argument is AuthorizationType => {
  return (
    typeof argument === 'string' &&
    (argument === AuthorizationType.EMAIL ||
      argument === AuthorizationType.GITHUB ||
      argument === AuthorizationType.SPOTIFY)
  );
};
