import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user.repository";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/register";
import { UserAlreadyExistsError } from "@/services/user-already-exists.error";

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);
    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ ok: false, "message": err.message });
    }
    
    throw err;
  }
  
  return reply.status(201).send();
}
