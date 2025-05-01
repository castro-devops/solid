import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to refresh a token.", async () => {
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

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies!)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String),
    }));
    expect(response.ok).toEqual(true);
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });

});
