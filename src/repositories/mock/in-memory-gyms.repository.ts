import { IGymsRepository } from "@/@types/gyms.repository";
import { Gym, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {

  public gyms: Gym[] = [];

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id);

    if (!gym) {
      return null;
    };

    return gym;
  }

}
