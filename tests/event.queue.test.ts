import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { EventQueueService } from "../src/services/event.queue";

describe("EventQueueService", () => {
  const queue = new EventQueueService();
  const sampleEvent = {
    event_id: "evt1",
    type: "page_view",
    user_id: "u1",
    ts: new Date().toISOString(),
    props: { path: "/home" },
  };

  it("should enqueue and dequeue an event", async () => {
    await queue.enqueue(sampleEvent);
    const dequeued = await queue.dequeue();
    expect(dequeued?.event_id).toBe(sampleEvent.event_id);
  });
});
