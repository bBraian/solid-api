import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterServiceParms {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password } :RegisterServiceParms) {
    const password_hash = await hash(password, 4)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    
    await this.usersRepository.create({ name, email, password_hash })
  }
}



