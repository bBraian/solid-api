import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCheckInService } from '@/http/services/factories/make-check-in-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParmsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParmsSchema.parse(request.body)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInService = makeCheckInService()
  await createCheckInService.execute({ 
    userLatitude: latitude, 
    userLongitude: longitude, 
    gymId,
    userId: request.user.sub
  })

  return reply.status(201).send()
}