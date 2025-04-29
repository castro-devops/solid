import { CheckIn } from "generated/prisma";
import { ICheckInsRepository } from "@/@types/check-ins.repository";
import { IGymsRepository } from "@/@types/gyms.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance.error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins.error";

interface ICheckInRequest {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitutde: number,
}
interface ICheckInResponse {
  checkIn: CheckIn
}

export class CheckInsService {

  constructor(
    private checkInRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitutde,
  }: ICheckInRequest): Promise<ICheckInResponse> {

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinate(
      { latitude: userLatitude, longitude: userLongitutde },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() });

    const MAX_DISTANCE_IN_KM = 0.1;
    
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }

}
