// File: redis.js
// Defines the Redis client and its methods
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (err) => console.error('Redis Client Error', err));
    this.client.connect();
    const { client } = this;
    process.on('SIGINT', () => client.disconnect());
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    const value = await this.client.GET(key)
      .catch((err) => console.error('Error:', err.message));
    return value;
  }

  async set(key, value, duration) {
    await this.client.SET(key, value)
      .catch((err) => console.error('Error:', err.message));
    await this.client.EXPIRE(key, duration)
      .catch((err) => console.error('Error:', err.message));
  }

  async del(key) {
    await this.client.DEL(key)
      .catch((err) => console.error('Error:', err.message));
  }
}

const redisClient = new RedisClient();
export default redisClient;
