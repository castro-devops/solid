import { CheckIn } from "generated/prisma";
import { ICheckInsRepository } from "@/@types/check-ins.repository";
import { IGymsRepository } from "@/@types/gyms.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

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
  }: ICheckInRequest): Promise<ICheckInResponse> {

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calculate distance between user and gym.
    

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new Error;
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
