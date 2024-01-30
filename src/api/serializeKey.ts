export type SerializeKey = string | ((params) => string | null);

const serializeKey = (key: SerializeKey, params): string | null => {
  return typeof key === 'function' ? key(params) : key;
};

export default serializeKey;
