import { ICheckInsRepository } from "@/@types/check-ins.repository";
import dayjs from "dayjs";
import { CheckIn, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICheckInsRepository {

  public checkIns: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.checkIns.find((check) => {
      const checkInDate = dayjs(check.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return check.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }
}
