import request from "supertest";
import app from "../src/server";
import { describe, it, expect } from "vitest";

describe("POST /v1/events - validation", () => {
  it("should return 400 if event_id is missing", async () => {
    const res = await request(app)
      .post("/v1/events")
      .send({
        type: "page_view",
        user_id: "u_1",
        ts: new Date().toISOString(),
        props: { path: "/home" },
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return 400 if props is not an object", async () => {
    const res = await request(app).post("/v1/events").send({
      event_id: "1",
      type: "page_view",
      user_id: "u_1",
      ts: new Date().toISOString(),
      props: "not-an-object",
    });
    expect(res.status).toBe(400);
  });
});
