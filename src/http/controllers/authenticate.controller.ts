import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user.repository";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials.error";

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(prismaUsersRepository);
    await authenticateService.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ ok: false, "message": err.message });
    }
    
    throw err;
  }
  
  return reply.status(200).send();
}
