// File: redis.js
// Defines the Redis client and its methods

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient()
    this.client.on('error', error => console.error(`Error: ${error.message}`));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    return promisify(this.client.SET).bind(this.client)(key, value, 'Ex', duration);
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
