/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRespository;
let sut:CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {

    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -2.5472541,
      longitude: -2.5472541
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});