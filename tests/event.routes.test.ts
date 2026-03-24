import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../src/server";

describe("POST /v1/events", () => {
  it("should return 202 Accepted for valid event", async () => {
    const res = await request(app)
      .post("/v1/events")
      .send({
        event_id: "550e8400-e29b-41d4-a716-446655440001",
        type: "page_view",
        user_id: "u_1",
        ts: new Date().toISOString(),
        props: { path: "/home" },
      });
    expect(res.status).toBe(202);
    expect(res.body.status).toBe("accepted");
  });
});
