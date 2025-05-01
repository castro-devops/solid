import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile.controller";
import { FastifyInstance } from "fastify";
import { refresh } from "./refresh.controller";

export async function routerUsers(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
