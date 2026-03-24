import { EventQueueService } from "../services/event.queue";
import { prisma } from "../config/prisma";

const eventQueue = new EventQueueService();

async function processEvent(event: any) {
  const eventDate = new Date(event.ts);

  const dateOnly = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
  );

  await prisma.aggDailyMetrics.upsert({
    where: {
      date_type: {
        date: dateOnly,
        type: event.type,
      },
    },
    update: {
      value: {
        increment: 1,
      },
    },
    create: {
      date: dateOnly,
      type: event.type,
      value: 1,
    },
  });

  console.log("Processed event:", event.event_id);
}

async function runWorker() {
  console.log("Worker started...");
  while (true) {
    const event = await eventQueue.dequeue();
    if (event) {
      await processEvent(event);
    } else {
      // Esperar un poco si no hay eventos
      await new Promise((r) => setTimeout(r, 100));
    }
  }
}

runWorker().catch(console.error);
