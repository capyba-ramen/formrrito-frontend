const TOKEN_COOKIE_KEY = 'access_token';

export const getToken = (): string | null => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${TOKEN_COOKIE_KEY}=`));

  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }

  return null;
};

export const setToken = (token: string): void => {
  document.cookie = `${TOKEN_COOKIE_KEY}=${token}; expires=${new Date(
    Date.now() + 86400000
  ).toUTCString()}; secure; samesite=strict`;
};

export const removeToken = (): void => {
  document.cookie = `${TOKEN_COOKIE_KEY}=; expires=${new Date(0).toUTCString()}; secure; samesite=strict`;
};
