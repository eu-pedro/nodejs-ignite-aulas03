import { afterEach, describe, expect, it, vi } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRespository;
let sut: CheckInUseCase;

describe('Check-In Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRespository();
    sut = new CheckInUseCase(usersRepository, gymsRepository);
    gymsRepository.items.push({
      id: 'gym-01',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {

    vi.setSystemTime(new Date(2023, 8, 12, 21,0,0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    });

    expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541 
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2023, 8, 12, 21,0,0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    });

    // -2.5472541,-44.2004845

    vi.setSystemTime(new Date(2023, 8, 13, 21,0,0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});