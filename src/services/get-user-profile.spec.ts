import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/mock/in-memory-users.repository";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get Use Profile Services", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get use profile.", async () => {
    const created = await usersRepository.create({
      name: "Jon Doe",
      email: "jondoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: created.id,
    });

    expect(user.id).toEqual(created.id);
    expect(user.name).toEqual("Jon Doe");
  });

  it("should not be able to get profile with wrong id.", async () => {
    await expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      });
    }).rejects.instanceOf(ResourceNotFoundError);
  });
});
