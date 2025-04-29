import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/mock/in-memory-gyms.repository";
import { GymsService } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: GymsService;

describe("Gym Services", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GymsService(gymsRepository);
  });

  it("should be able to create gym.", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: 37.4220541,
      longitude: -122.0853242,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
