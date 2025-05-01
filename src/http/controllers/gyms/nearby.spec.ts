import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Nearby Gym Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to list nearby gyms.", async () => {

    const { token } = await createAndAuthenticateUser(app, "ADMIN");

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: -6.373021,
        longitude: -39.294969,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: 37.4220541,
        longitude: -122.0853242,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -6.373021,
        longitude: -39.294969,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    const { ok, gyms } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining ({
        title: "Near Gym",
      }),
    ]);
    expect(ok).toEqual(true);
  });

});
