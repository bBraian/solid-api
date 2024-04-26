import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeSearchGymsService } from '@/http/services/factories/make-search-gyms-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymService = makeSearchGymsService()
  const gyms = await searchGymService.execute({ query, page })

  return reply.status(201).send({
    gyms
  })
}