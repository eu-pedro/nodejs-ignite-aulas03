import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '@/use-cases/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object( {
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  } );

  // $2a$06$S3xD4knSI24XirDP7nt6h.2wntsommCjEdtwJZmq8v0pgGCrVREAW

  const { email, name, password } = registerBodySchema.parse( request.body );

  try {
    const usersRepository = new PrismaUsersRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({name,
      email,
      password});
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status( 201 ).send();
}