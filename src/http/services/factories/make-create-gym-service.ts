import { CreateGymService } from "../create-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new CreateGymService(gymsRepository)

  return service
}