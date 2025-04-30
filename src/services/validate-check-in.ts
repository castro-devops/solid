import { CheckIn } from "generated/prisma";
import { ICheckInsRepository } from "@/@types/check-ins.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";

interface IValidateCheckInRequest {
  checkInId: string
}
interface IValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInsService {

  constructor(
    private checkInRepository: ICheckInsRepository,
  ) {}

  async execute({
    checkInId,
  }: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {

    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return {
      checkIn,
    };
  }

}
