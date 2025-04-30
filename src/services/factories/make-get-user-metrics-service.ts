import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { GetUserMetricsService } from "../get-user-metrics";

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const getUserMetricsService = new GetUserMetricsService(checkInsRepository);
  return getUserMetricsService;
}
