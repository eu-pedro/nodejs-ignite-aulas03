import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  // $2a$06$S3xD4knSI24XirDP7nt6h.2wntsommCjEdtwJZmq8v0pgGCrVREAW

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({name,
      email,
      password});
  } catch (error) {
    if(error instanceof UserAlreadyExistsError){
      return reply.status(409).send({message: error.message});
    }

    throw error;
  }

  return reply.status(201).send();
}