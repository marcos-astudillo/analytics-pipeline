import request from "supertest";
import app from "../src/server";
import { describe, it, expect } from "vitest";

describe("GET /v1/metrics", () => {
  it("should return daily metrics array", async () => {
    const res = await request(app).get("/v1/metrics");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
