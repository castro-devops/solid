import { IFindManyNearbyParams, IGymsRepository } from "@/@types/gyms.repository";
import { db } from "@/lib/prisma";
import { Gym, Prisma } from "generated/prisma";

export class PrismaGymsRepository implements IGymsRepository {

  async findById(id: string) {
    const gym = await db.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
    const gyms = await db.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
  async searchMany(query: string, page: number) {
    const gyms = await db.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await db.gym.create({
      data,
    });
    return gym;
  }
  
}
