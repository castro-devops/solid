import { CheckIn, Prisma } from "generated/prisma";

export interface ICheckInsRepository {
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
