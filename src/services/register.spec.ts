import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/mock/in-memory-users.repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Services", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });

  it("should be able te register.", async () => {
    const { user } = await sut.execute({
      name: "Jon Doe",
      email: "jondoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration.", async () => {
    const { user } = await sut.execute({
      name: "Jon Doe",
      email: "jondoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice.", async () => {
    const email = "jondoe@example.com";

    await sut.execute({
      name: "Jon Doe",
      email,
      password: "123456",
    });

    await expect(async () => {
      await sut.execute({
        name: "Jon Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
