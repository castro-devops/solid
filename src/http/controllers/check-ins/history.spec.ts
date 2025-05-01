import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { db } from "@/lib/prisma";

describe("CheckIn History Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to list check-ins history.", async () => {

    const { token } = await createAndAuthenticateUser(app);

    const user = await db.user.findFirstOrThrow();

    const gym = await db.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -6.373021,
        longitude: -39.294969,
      },
    });

    await db.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },{
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const { ok } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ]);
    expect(ok).toEqual(true);
  });

});
