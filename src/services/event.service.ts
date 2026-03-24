import { EventInput } from "../models/event.schema";
import { EventRepository } from "../repositories/event.repository";

const eventRepository = new EventRepository();

export class EventService {
  async ingestEvent(event: EventInput): Promise<void> {
    await eventRepository.save(event);

    console.log("Event persisted:", event.event_id);
  }
}
