import { Gym } from "generated/prisma";
import { IGymsRepository } from "@/@types/gyms.repository";

interface IFetchNearbyGymsServiceRequest {
  userLatitude: number,
  userLongitude: number
}
interface IFetchNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {

  constructor( private gymsRepository: IGymsRepository ) {}

  async execute({
    userLatitude,
    userLongitude,
  } : IFetchNearbyGymsServiceRequest): Promise<IFetchNearbyGymsServiceResponse>
  {
    const gyms = await this.gymsRepository.fyndManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
