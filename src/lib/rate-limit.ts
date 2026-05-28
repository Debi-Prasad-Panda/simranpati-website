import { LRUCache } from "lru-cache";

const limiter = new LRUCache<string, number>({ max: 500 });

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = limiter.get(key);
  if (entry && entry > now) {
    const countKey = `${key}:count`;
    const count = (limiter.get(countKey) ?? 0) + 1;
    limiter.set(countKey, count, { ttl: windowMs });
    if (count > limit) {
      return false;
    }
    return true;
  }

  limiter.set(key, now + windowMs, { ttl: windowMs });
  limiter.set(`${key}:count`, 1, { ttl: windowMs });
  return true;
}
