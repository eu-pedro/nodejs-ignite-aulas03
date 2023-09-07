
import { UsersRepository } from '@/repositories/user-repository';
// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequestProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {

  constructor (private usersRepository: UsersRepository){}

  async execute ({name, email, password}: RegisterUseCaseRequestProps){
    const password_hash = await hash(password, 6);
   
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
    if(userWithSameEmail) {
      throw new Error('E-mail already registered');
    }
  
    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}