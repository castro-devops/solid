import { app } from "@/app";
import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile.controller";

export async function routerUsers() {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
