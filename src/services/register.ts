import { db } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
     name: string,
     email: string,
     password: string
}

export class RegisterService {

  constructor( private userRepository: any ) {}

  async execute({
    name,
    email,
    password,
  } : RegisterServiceRequest)
  {
    const password_hash = await hash(password, 6);
  
    const userWithSameEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("Email already exist.");
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
