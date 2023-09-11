import { describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRespository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {

    await expect(() => sut.execute({
      email: 'john.doe@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123', 6)
    });

    await expect(() => sut.execute({
      email: 'john.doe@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});