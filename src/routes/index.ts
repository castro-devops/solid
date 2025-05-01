import { FastifyInstance } from "fastify";
import { routerUsers } from "@/http/controllers/users/routes";
import { routerGyms } from "@/http/controllers/gyms/routes";
import { routerCheckIns } from "@/http/controllers/check-ins/routes";

export async function appRoutes(app: FastifyInstance)
{
  app.register(routerUsers);
  app.register(routerGyms);
  app.register(routerCheckIns);
}
