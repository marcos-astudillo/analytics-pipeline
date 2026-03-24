import { EventInput } from "../models/event.schema";
import { EventRepository } from "../repositories/event.repository";
import { EventQueueService } from "./event.queue";

const eventRepository = new EventRepository();
const eventQueue = new EventQueueService();

export class EventService {
  async ingestEvent(event: EventInput): Promise<void> {
    // Immediate persistence in the database
    await eventRepository.save(event);

    // Send to Event Bus / Redis
    await eventQueue.enqueue(event);

    console.log("Event persisted and queued:", event.event_id);
  }
}
