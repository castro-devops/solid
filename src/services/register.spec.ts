import { expect, describe, it } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/mock/in-memory-users.repository";
import { UserAlreadyExistsError } from "./user-already-exists.error";

describe("Register Services", () => {
  it("should be able te register.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "Jon Doe",
      email: "jondoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration.", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
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
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const email = "jondoe@example.com";

    await registerService.execute({
      name: "Jon Doe",
      email,
      password: "123456",
    });

    await expect(async () => {
      await registerService.execute({
        name: "Jon Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
