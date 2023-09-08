
import { UsersRepository } from '@/repositories/user-repository';
// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequestProps {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponseProps {
  user: User
}

export class RegisterUseCase {

  constructor (private usersRepository: UsersRepository){}

  async execute ({name, email, password}: RegisterUseCaseRequestProps): Promise<RegisterUseCaseResponseProps>{
    const password_hash = await hash(password, 6);
   
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });

    return { user };
  }
}