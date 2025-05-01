import request from "supertest";
import { FastifyInstance } from "fastify";
import { db } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser(app: FastifyInstance, role: "ADMIN" | "OPERATOR" | "MEMBER" = "MEMBER") {

  await db.user.create({
    data: {
      name: "Jon Doe",
      email: "jondoe@example.com",
      password_hash: await hash("123456", 6),
      role,
    },
  });
  
  const response = await request(app.server)
    .post("/sessions")
    .send({
      email: "jondoe@example.com",
      password: "123456",
    });
  
  const { token, ok } = response.body;

  return {
    token,
    ok,
  };
}
