import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Create Gym Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a gym.", async () => {

    const { token } = await createAndAuthenticateUser(app, "ADMIN");

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Academia para Desenvolvedores do Ecossistema JavaScript",
        phone: "88988888888",
        latitude: -6.373021,
        longitude: -39.294969,
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(201);
    expect(ok).toEqual(true);
  });

});
