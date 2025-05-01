import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { appRoutes } from "./routes";
import { ZodError } from "zod";
import { env } from "@/env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  verify: {
    extractToken: (request) => {
      if (request.url === "/token/refresh") {
        return request.cookies && request.cookies.refreshToken;
      } else {
        return (
          request.headers.authorization &&
          request.headers.authorization.split(" ")[1]
        );
      }
    },
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ ok: false, message: "Erro de validação", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool. Datalog|NewRelic|Sentry
  }

  return reply.status(500).send({ message: "Tivemos um erro interno." });
});
