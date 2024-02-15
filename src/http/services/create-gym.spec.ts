import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe('Register Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym-01 JS',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: null,
      phone: null
    })
    
    expect(gym.id).toEqual(expect.any(String))
  })
})