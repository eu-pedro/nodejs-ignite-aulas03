/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRespository;
let sut:RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registrations', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456'
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it('should not be able to register with same email twice', async () => {

    const email = 'john.doe@email.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    });

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});