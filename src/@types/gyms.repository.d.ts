import { Gym, Prisma } from "generated/prisma";

export interface IFindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
