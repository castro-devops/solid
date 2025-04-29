import { IUsersRepository } from "@/@types/users.repository";
import { User } from "generated/prisma";
import { UserAlreadyExistsError } from "./user-already-exists.error";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
  name: string,
  email: string,
  password: string
}
interface RegisterServiceResponse {
  user: User
}

export class RegisterService {

  constructor( private userRepository: IUsersRepository ) {}

  async execute({
    name,
    email,
    password,
  } : RegisterServiceRequest): Promise<RegisterServiceResponse>
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
