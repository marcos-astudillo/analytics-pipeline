import { prisma } from "../config/prisma";
import { EventInput } from "../models/event.schema";

export class EventRepository {
  async save(event: EventInput) {
    return prisma.rawEvent.create({
      data: {
        eventId: event.event_id,
        type: event.type,
        userId: event.user_id,
        timestamp: new Date(event.ts),
        props: event.props,
      },
    });
  }
}
