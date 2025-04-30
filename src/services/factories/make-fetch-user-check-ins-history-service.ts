import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

export function makeFetchUserCheckInsHistoryService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInsRepository = new FetchUserCheckInsHistoryService(prismaCheckInsRepository);
  return fetchUserCheckInsRepository;
}
