import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search.controller";
import { nearby } from "./nearby.controller";
import { create } from "./create.controller";
import { FastifyInstance } from "fastify";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function routerGyms(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
  
  app.post("/gyms", { onRequest: [verifyUserRole({ role: "ADMIN" })] }, create);
}
