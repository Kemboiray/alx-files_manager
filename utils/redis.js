// File: redis.js
// Defines the Redis client and its methods
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => console.error(`Error: ${error.message}`));
    this.quit = this.client.quit;
  }

  isAlive() {
    let connected = false;
    this.client.on('connect', () => { connected = true; });
    return connected;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.GET(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.SETEX(key, duration, value, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.DEL(key, (err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
  }
}

const redisClient = new RedisClient();
process.on('SIGINT', () => redisClient.quit());
module.exports = redisClient;
