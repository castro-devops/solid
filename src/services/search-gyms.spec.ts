import { InMemoryGymsRepository } from "@/repositories/mock/in-memory-gyms.repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search Gyms Services", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search for gyms.", async () => {

    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: 37.4220541,
      longitude: -122.0853242,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: 37.4220541,
      longitude: -122.0853242,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search.", async () => {

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym - ${i}`,
        description: null,
        phone: null,
        latitude: 37.4220541,
        longitude: -122.0853242,
      });
    }

    const { gyms } = await sut.execute({
      query: "javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym - 21" }),
      expect.objectContaining({ title: "JavaScript Gym - 22" }),
    ]);
  });

});
