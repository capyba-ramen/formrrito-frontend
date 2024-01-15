export function parseQueryString(queryString: string): { [key: string]: string } {
  const params = new URLSearchParams(queryString);
  const result: { [key: string]: string } = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}

export const generateQueryString = (params: { [key: string]: string }): string =>
  `?${new URLSearchParams(params).toString()}`;
