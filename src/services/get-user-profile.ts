import { IUsersRepository } from "@/@types/users.repository";
import { User } from "generated/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface IGetUseProfileRequest {
  userId: string
}
interface IGetUseProfileResponse {
  user: User
}

export class GetUserProfileService {

  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
  }: IGetUseProfileRequest): Promise<IGetUseProfileResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }

}
