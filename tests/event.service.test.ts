import { describe, it, expect, vi } from "vitest";
import { EventService } from "../src/services/event.service";
import { EventRepository } from "../src/repositories/event.repository";

describe("EventService", () => {
  it("should call repository.save when ingestEvent is called", async () => {
    const mockSave = vi.fn();
    vi.spyOn(EventRepository.prototype, "save").mockImplementation(mockSave);

    const service = new EventService();
    await service.ingestEvent({
      event_id: "1",
      type: "page_view",
      user_id: "u1",
      ts: new Date().toISOString(),
      props: {},
    });

    expect(mockSave).toHaveBeenCalled();
  });
});
