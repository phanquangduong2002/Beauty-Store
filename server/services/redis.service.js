import redis from "redis";
import { promisify } from "util";
import { reservationInventory } from "../repositories/inventory.repo.js";

const redisClient = redis.createClient();

const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

export const acquireLock = async (productId, quantity, cartId) => {
  const key = `lock_v2023_${productId}`;

  const retryTimes = 10;
  const expireTime = 3000;

  for (let i = 0; i < retryTimes; i++) {
    const result = await setnxAsync(key, expireTime);

    if (result === 1) {
      const isReversation = await reservationInventory({
        productId,
        quantity,
        cartId,
      });
      if (isReversation.modifiedCount) {
        await pexpire(key, expireTime);
        return key;
      }
      return null;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};

export const releaseLock = async (keyLock) => {
  const delAsynckey = promisify(redisClient.del).bind(redisClient);

  return await delAsynckey(keyLock);
};
