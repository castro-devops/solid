import { Gym } from "generated/prisma";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { hash } from "bcryptjs";
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
    longitude
  } : IGymServiceRequest): Promise<IGymServiceResponse>
  {
    const user = await this.gymRepository.create({
      title,
      description,
      phone,
      
    });

    return {
      user,
    };
  }
}
