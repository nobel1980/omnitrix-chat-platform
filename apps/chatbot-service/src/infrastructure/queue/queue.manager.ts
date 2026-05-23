import { Queue } from 'bullmq';
import { redis } from '../cache/redis.client';

export class QueueManager {
  private static queues = new Map<string, Queue>();

  public static getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const q = new Queue(name, { connection: redis });
      this.queues.set(name, q);
    }
    return this.queues.get(name)!;
  }
}
