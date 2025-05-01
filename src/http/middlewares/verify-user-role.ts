import { FastifyReply, FastifyRequest } from "fastify";

interface Role {
  role: "ADMIN" | "OPERATOR" | "MEMBER" | ("ADMIN" | "OPERATOR" | "MEMBER")[]
}

export function verifyUserRole ({ role: roleToVerify } : Role) {

  return async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    
    if (!request.user.sub) {
      return reply.status(401).send({ ok: false, message: "Usuário não autenticado." });
    }

    const allowedRoles = Array.isArray(roleToVerify) ? roleToVerify : [roleToVerify];

    if (!allowedRoles.includes(request.user.role)) {
      return reply.status(401).send({ ok: false, message: "Não autorizado." });
    }
  };
}
