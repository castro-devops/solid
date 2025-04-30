import { FastifyInstance } from "fastify";
import { authenticate } from "@/http/controllers/authenticate.controller";
import { profile } from "@/http/controllers/profile.controller";
import { register } from "@/http/controllers/register.controller";

export async function appRoutes(app: FastifyInstance)
{
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get("/me", profile);
}
