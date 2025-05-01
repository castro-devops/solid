import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Authenticate Controller (e2e)", () => {
  
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("Should be able authenticate.", async () => {

    const { token } = await createAndAuthenticateUser(app);

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
