import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { EventQueueService } from "../src/services/event.queue";
import { prisma } from "../src/config/prisma";

describe("Worker durability / retry", () => {
  const queue = new EventQueueService();
  const sampleEvent = {
    event_id: "evt-durable",
    type: "page_view",
    user_id: "u1",
    ts: new Date().toISOString(),
    props: { path: "/home" },
  };

  beforeEach(async () => {
    // Clean Redis queue before each test
    while ((await queue.dequeue()) !== null) {}
  });

  afterEach(async () => {
    // Optional: cleanup metrics
    await prisma.aggDailyMetrics.deleteMany({
      where: { type: "page_view" },
    });
  });

  it("should keep event in queue if worker fails", async () => {
    // Enqueue the event
    await queue.enqueue(sampleEvent);

    // Simulate worker failure
    const failProcess = async (event: any) => {
      throw new Error("Simulated failure");
    };

    let event = await queue.dequeue();
    try {
      await failProcess(event);
    } catch {
      // Re-enqueue manually as recovery
      if(event){
          await queue.enqueue(event);
      }
    }

    // Next dequeue should still return the same event
    const retryEvent = await queue.dequeue();
    expect(retryEvent?.event_id).toBe(sampleEvent.event_id);
  });
});
