import * as redis from 'redis'

// @ts-ignore
const pubClient = redis.createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();


export {
  pubClient,
  subClient
}