import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/mock/in-memory-check-ins.repository";
import { CheckInsService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/mock/in-memory-gyms.repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInsService;

describe("Register Services", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInsService(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: "gym-id",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able create check-in.", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 5, 0, 0));
    
    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: 37.4220541,
        userLongitutde: -122.0853242,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 5, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: 37.4220541,
        userLongitutde: -122.0853242,
      });
    }).rejects.toBeInstanceOf(Error);
  });
  
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 5, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    vi.setSystemTime(new Date(2025, 0, 2, 5, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });
});
