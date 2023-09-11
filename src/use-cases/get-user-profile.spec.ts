import { describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRespository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {

    const createUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      userId: createUser.id
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {

    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});