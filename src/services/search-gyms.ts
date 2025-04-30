import { Gym } from "generated/prisma";
import { IGymsRepository } from "@/@types/gyms.repository";

interface ISearchGymsServiceRequest {
  query: string,
  page: number
}
interface ISearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsService {

  constructor( private gymsRepository: IGymsRepository ) {}

  async execute({
    query,
    page,
  } : ISearchGymsServiceRequest): Promise<ISearchGymsServiceResponse>
  {
    const gyms = await this.gymsRepository.searchMany( query, page );

    return {
      gyms,
    };
  }
}
