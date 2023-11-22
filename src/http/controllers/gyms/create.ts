import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create (request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90
    ),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  // $2a$06$S3xD4knSI24XirDP7nt6h.2wntsommCjEdtwJZmq8v0pgGCrVREAW

  const { description,latitude, longitude, phone,title } = createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  });

  return reply.status(201).send();
}