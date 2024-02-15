import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/checkins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotExistError } from "./errors/resource-not-exist-error";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository  
  ) {}

  async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) {
      throw new ResourceNotExistError()
    }

    //calc distance between gym and user
    

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDay) {
      throw new Error("Can't check in twice in a day");
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId, 
      user_id: userId
    })
    
    return { checkIn }
  }
}