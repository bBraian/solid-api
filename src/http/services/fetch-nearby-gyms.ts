import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsServiceParms {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude } :FetchNearbyGymsServiceParms): Promise<FetchNearbyGymsServiceResponse> {
  
    const gyms = await this.gymsRepository.findManyNearby(userLatitude, userLongitude)

    return { gyms }
  }
}



