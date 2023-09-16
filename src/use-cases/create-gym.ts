import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseRequestProps {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponseProps {
  gym: Gym
}

export class CreateGymUseCase {

  constructor (private gymsRepository: GymsRepository){}

  async execute ({description, latitude, longitude, phone, title}: CreateGymUseCaseRequestProps): Promise<CreateGymUseCaseResponseProps>{
  
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title
    });

    return { gym };
  }
}