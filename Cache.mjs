const cache = [];

export const addCache = (key, value, TTL = 1000 * 60 * 1) => {
  const Exist = findCache(key);
  if (Exist) return;

  cache.push({ key, value });

  if (TTL == 0 || TTL == Infinity) return;

  setTimeout(() => {
    const index = cache.findIndex((item) => item.key === key);
    if (index > -1) {
      cache.splice(index, 1);
    }
  }, TTL);
};

export const findCache = (key) => {
  const cacheItem = cache.find((item) => item.key === key);
  return cacheItem ? cacheItem.value : undefined;
};

export const clearCache = () => {
  cache.length = 0;
};
