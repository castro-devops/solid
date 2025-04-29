import { IUsersRepository } from "@/@types/users.repository";
import { User } from "generated/prisma";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { hash } from "bcryptjs";

interface IRegisterServiceRequest {
  name: string,
  email: string,
  password: string
}
interface IRegisterServiceResponse {
  user: User
}

export class RegisterService {

  constructor( private userRepository: IUsersRepository ) {}

  async execute({
    name,
    email,
    password,
  } : IRegisterServiceRequest): Promise<IRegisterServiceResponse>
  {

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
