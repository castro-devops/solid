import { InMemoryGymsRepository } from "@/repositories/mock/in-memory-gyms.repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Services", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms.", async () => {

    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -6.373021,
      longitude: -39.294969,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: 37.4220541,
      longitude: -122.0853242,
    });

    const { gyms } = await sut.execute({
      userLatitude: -6.368909,
      userLongitude: -39.288814,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });

});
