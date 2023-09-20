import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsUseCaseRequestProps {
  query: string
  page: number
}

interface SearchGymsUseCaseResponseProps {
  gyms: Gym[]
}

export class SearchGymsUseCase {

  constructor (private gymsRepository: GymsRepository){}

  async execute ({query, page}: SearchGymsUseCaseRequestProps): Promise<SearchGymsUseCaseResponseProps>{
  
    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    );

    return { gyms };
  }
}