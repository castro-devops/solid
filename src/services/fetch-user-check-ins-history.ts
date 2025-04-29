import { CheckIn } from "generated/prisma";
import { ICheckInsRepository } from "@/@types/check-ins.repository";

interface IFetchUserCheckInsHistoryRequest {
  userId: string,
  page: number
}
interface IFetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {

  constructor(
    private checkInRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryRequest): Promise<IFetchUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }

}
