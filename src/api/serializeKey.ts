export type SerializeKey<T> = string | ((params: T) => string);

const serializeKey = <T>(key: SerializeKey<T>, params: T): string => {
  return typeof key === 'function' ? key(params) : key;
};

export default serializeKey;
