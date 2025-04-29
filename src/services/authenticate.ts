import { IUsersRepository } from "@/@types/users.repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { compare } from "bcryptjs";
import { User } from "generated/prisma";

interface IAuthenticateRequest {
  email: string,
  password: string,
}
interface IAuthenticateResponse {
  user: User
}

export class AuthenticateService {

  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(
      password,
      user.password_hash,
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }

}
