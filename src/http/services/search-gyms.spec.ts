import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)

  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: null,
      phone: null
    })

    const { gyms } = await sut.execute({ query: 'Javascript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' })
    ])
  })
})