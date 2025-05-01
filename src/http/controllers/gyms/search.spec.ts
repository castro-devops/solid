import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Search Gym Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search gyms.", async () => {

    const { token } = await createAndAuthenticateUser(app, "ADMIN");

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Academia para Desenvolvedores do Ecossistema JavaScript",
        phone: "88988888888",
        latitude: -6.373021,
        longitude: -39.294969,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Academia para Desenvolvedores somente do TypeScript",
        phone: "88988888888",
        latitude: -6.373021,
        longitude: -39.294969,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    const { ok, gyms } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining ({
        title: "JavaScript Gym",
      }),
    ]);
    expect(ok).toEqual(true);
  });

});
