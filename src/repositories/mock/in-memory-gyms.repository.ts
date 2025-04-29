import { IGymsRepository } from "@/@types/gyms.repository";
import { Gym } from "generated/prisma";

export class InMemoryGymsRepository implements IGymsRepository {

  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id);

    if (!gym) {
      return null;
    };

    return gym;
  }

}
