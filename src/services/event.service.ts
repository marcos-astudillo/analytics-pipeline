import { EventInput } from "../models/event.schema";

export class EventService {
  async ingestEvent(event: EventInput): Promise<void> {
    // Por ahora solo log (luego irá al Event Bus)
    console.log("Event received:", event);
  }
}
