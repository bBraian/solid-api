import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(usersRepository)
  })

  it('should be able to register a new user', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123'
    })
    
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registrations', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123123',
      user.password_hash
    )
    
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not not be able to register with same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123123'
    })
    
    await expect(() => 
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})