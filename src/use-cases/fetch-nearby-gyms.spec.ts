import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';

import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRespository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRespository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

  });

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -2.5472541,
      longitude: -2.5472541
    });

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -2.4756038,
      longitude: -44.1090677
    });
    const { gyms } = await sut.execute({
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Near Gym'}),
    ]);
  });
});