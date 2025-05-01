import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able authenticate.", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Jon Doe",
        email: "jondoe@example.com",
        password: "123456",
      });

    const response = await request(app.server)
      .post("/sessions")
      .send({
        email: "jondoe@example.com",
        password: "123456",
      });

    const { token, ok } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(token).toEqual(expect.any(String));
    expect(ok).toEqual(true);
  });

  it.skip("Should not be able authenticate with invalid data.", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Jon Doe",
        email: "jondoe@example.com",
        password: "123456",
      });

    const response = await request(app.server)
      .post("/sessions")
      .send({
        email: "jondoe@example.com",
        password: "123",
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(400);
    expect(ok).toEqual(false);
  });

});
