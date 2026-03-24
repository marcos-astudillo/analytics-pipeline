import { redis } from "../config/redis";
import { EventInput } from "../models/event.schema";

const EVENT_QUEUE = "events_queue";

export class EventQueueService {
  async enqueue(event: EventInput) {
    // Store the event as JSON in a Redis list.
    await redis.rpush(EVENT_QUEUE, JSON.stringify(event));
  }

  async dequeue(): Promise<EventInput | null> {
    const data = await redis.lpop(EVENT_QUEUE);
    return data ? (JSON.parse(data) as EventInput) : null;
  }
}
