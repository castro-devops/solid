import { Gym } from "generated/prisma";

interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
}
