import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { SearchGymsService } from "../search-gyms";

export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new SearchGymsService(gymsRepository);
  return service;
}
