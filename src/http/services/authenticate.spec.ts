import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123123', 4)
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123123'
    })
    
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 4)
    })
    
    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})