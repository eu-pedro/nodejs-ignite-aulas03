import { UsersRepository } from '@/repositories/user-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor (private usersRepository: UsersRepository) {}

  async execute ({ email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // auth
    // buscar o usuário no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do parâmetro

    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new InvalidCredentialsError();
    }

    // boolean => escrever a variável de uma forma que a leitura dela seja semântica.
    // se "if" <nome da variável>
    // boolean => "is", "has", "does"

    const doesPasswordMatches = await compare(password, user.password_hash);

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user
    };
  }
}