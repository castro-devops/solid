import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validate (request: FastifyRequest, reply: FastifyReply) {
  const valdiateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = valdiateCheckInParamsSchema.parse(request.params);

  const validateCheckInsService = makeValidateCheckInService();
  await validateCheckInsService.execute({
    checkInId,
  });
  
  return reply.status(202).send({ ok: true });
}
