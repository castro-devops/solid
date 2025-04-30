import { ICheckInsRepository } from "@/@types/check-ins.repository";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";
import { CheckIn, Prisma } from "generated/prisma";

export class PrismaCheckInsRepository implements ICheckInsRepository {

  async findById(checkInId: string) {
    const checkIn = await db.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const manyCheckIns = await db.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page -1) * 20,
    });

    return manyCheckIns;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await db.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async countByUserId(userId: string) {
    const count = await db.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await db.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInUpdated = await db.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return checkInUpdated;
  }
  
}
