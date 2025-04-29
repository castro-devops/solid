import { ICheckInsRepository } from "@/@types/check-ins.repository";

interface IGetUserMetricsRequest {
  userId: string,
}
interface IGetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsService {

  constructor(
    private checkInRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
  }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {

    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }

}
