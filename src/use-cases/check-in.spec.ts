import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-In Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(usersRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});