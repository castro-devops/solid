import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { db } from "@/lib/prisma";

describe("Validate CheckIn Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able to validate a check-in.", async () => {

    const { token } = await createAndAuthenticateUser(app, "OPERATOR");

    const user = await db.user.findFirstOrThrow();

    const gym = await db.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -6.373021,
        longitude: -39.294969,
      },
    });

    let checkIn = await db.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    const { ok } = response.body;

    expect(response.statusCode).toEqual(202);
    expect(ok).toEqual(true);

    checkIn = await db.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

});
