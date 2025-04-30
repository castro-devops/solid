import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { ValidateCheckInsService } from "../validate-check-in";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckInService = new ValidateCheckInsService(checkInsRepository);
  return validateCheckInService;
}
