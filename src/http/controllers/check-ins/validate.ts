import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeValidateCheckInService } from '@/http/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParmsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParmsSchema.parse(request.body)

  const validateCheckInService = makeValidateCheckInService()
  await validateCheckInService.execute({ checkInId })

  return reply.status(204).send()
}