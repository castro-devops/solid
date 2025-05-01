import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "Jon Doe",
        email: "jondoe@example.com",
        password: "123456",
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(201);
    expect(ok).toEqual(true);
  });

  it.skip("Should not be able to register with an existing user.", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "123456",
      });

    const response = await request(app.server)
      .post("/users")
      .send({
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "123456",
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(409);
    expect(ok).toEqual(false);
  });

  it.skip("should not be able to register with incorrect data.", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "Jon Doe",
        email: "jondoe@example.com",
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(400);
    expect(ok).toEqual(false);
  });
});
