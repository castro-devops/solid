import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/mock/in-memory-check-ins.repository";
import { CheckInsService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/mock/in-memory-gyms.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins.error";
import { MaxDistanceError } from "./errors/max-distance.error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInsService;

describe("Check-in Services", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInsService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: 37.4220541,
      longitude: -122.0853242,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able create check-in.", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 5, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: 37.4220541,
        userLongitutde: -122.0853242,
      });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });
  
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 5, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    vi.setSystemTime(new Date(2025, 0, 2, 5, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 37.4220541,
      userLongitutde: -122.0853242,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able in on distant.", async () => {

    gymsRepository.gyms.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-6.3729714),
      longitude: new Decimal(-39.2981091),
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 37.4220541,
        userLongitutde: -122.0853242,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });

});
