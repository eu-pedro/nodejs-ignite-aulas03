import { afterEach, describe, expect, it, vi } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-In Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(usersRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {

    vi.setSystemTime(new Date(2023, 8, 12, 21,0,0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2023, 8, 12, 21,0,0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    vi.setSystemTime(new Date(2023, 8, 13, 21,0,0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});