import { app } from "@/app";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create.controller";

export async function routerCheckIns() {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms/:gymsId/check-ins", create);
}
