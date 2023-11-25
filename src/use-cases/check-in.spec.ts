import { afterEach, describe, expect, it, vi } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRespository;
let sut: CheckInUseCase;

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRespository();

    sut = new CheckInUseCase(usersRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: -2.5472541,
      longitude: -2.5472541,
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
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
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

  // -2.4659589,-44.146162

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-2.4659589),
      longitude: new Decimal(-44.146162),
    });

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -2.5472541,
      userLongitude: -2.5472541
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});