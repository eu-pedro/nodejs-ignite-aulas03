import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';

import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRespository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRespository();
    sut = new SearchGymsUseCase(gymsRepository);

  });

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'Js gym',
      description: null,
      phone: null,
      latitude: -2.5472541,
      longitude: -2.5472541
    });

    await gymsRepository.create({
      title: 'React gyms',
      description: null,
      phone: null,
      latitude: -2.5472541,
      longitude: -2.5472541
    });
    
    const { gyms } = await sut.execute({
      query: 'Js',
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Js gym'}),
    ]);
  });

  it('should be able to fetch paginated gym search', async () => {

    for(let i = 1; i<=22; i++) {
      await gymsRepository.create({
        title: `React gyms ${i}`,
        description: null,
        phone: null,
        latitude: -2.5472541,
        longitude: -2.5472541
      });
    }
    
    const { gyms } = await sut.execute({
      query: 'React',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'React gyms 21'}),
      expect.objectContaining({ title: 'React gyms 22'})
    ]);
  });
});