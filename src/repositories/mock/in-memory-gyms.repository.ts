import { IFindManyNearbyParams, IGymsRepository } from "@/@types/gyms.repository";
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {

  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id);

    if (!gym) {
      return null;
    };

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter(gym => gym.title.toLowerCase().includes(query.toLocaleLowerCase()))
      .slice((page -1) * 20, page * 20);
  }

  async findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinate(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
      );

      return distance <= 10;
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };
    this.gyms.push(gym);
    return gym;
  }

}
