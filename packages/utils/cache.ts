import { redis } from "../lib/redis";

export default function cache<V, K = string>(
  key: K,
  value: V,
  secondToken: "EX",
  sec: number,
): void {
  redis.set(String(key), JSON.stringify(value), secondToken, sec);
}
