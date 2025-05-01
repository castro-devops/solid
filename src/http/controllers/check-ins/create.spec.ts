import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { db } from "@/lib/prisma";

describe("Create CheckIn Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a check-in.", async () => {

    const { token } = await createAndAuthenticateUser(app);

    const gym = await db.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -6.373021,
        longitude: -39.294969,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -6.373021,
        longitude: -39.294969,
      });

    const { ok } = response.body;

    expect(response.statusCode).toEqual(201);
    expect(ok).toEqual(true);
  });

});
