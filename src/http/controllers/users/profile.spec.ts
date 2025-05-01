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

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({
        email: "jondoe@example.com",
        password: "123456",
      });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    const { user, ok } = profileResponse.body;

    expect(profileResponse.statusCode).toEqual(200);
    expect(user).toEqual(expect.objectContaining({
      email: "jondoe@example.com",
    }));
    expect(ok).toEqual(true);
  });

});
