// File: redis.js
// Defines the Redis client and its methods
const redis = require('redis');

class RedisClient {
  constructor() {
    let redisClient;
    try {
      (async () => {
        redisClient = await redis.createClient();
        redisClient.on('error', err => { throw Error(err); });
        await redisClient.connect();
        process.on('SIGINT', () => redisClient.disconnect());
      })();
      this.client = redisClient;
    } catch(err) {
      console.error(err); 
    }
  }

  isAlive() {
    return this.client.isReady;
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
