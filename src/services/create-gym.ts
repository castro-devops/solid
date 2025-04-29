import { Gym } from "generated/prisma";
import { IGymsRepository } from "@/@types/gyms.repository";

interface IGymServiceRequest {
  title: string,
  description: string | null,
  phone: string | null,
  latitude: number,
  longitude: number,
}
interface IGymServiceResponse {
  gym: Gym
}

export class GymService {

  constructor( private gymRepository: IGymsRepository ) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  } : IGymServiceRequest): Promise<IGymServiceResponse>
  {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
