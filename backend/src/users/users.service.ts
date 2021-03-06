import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './users.entity';
import { CreateUserDTO } from './createUser.dto';
import { MessageDto } from 'src/common/message.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  getUserByEmail(email: string): Promise<any> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async getUserByToken(token: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { token },
    });
  }

  getUserById(id: string): Promise<any> {
    return this.usersRepository.findByPk(id);
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async createUser(data): Promise<UserDTO> {
    const { email, name, password, last_name, token, status, address } = data;
    const saltRounds = 10;
    const hashedPW = bcrypt.hashSync(password, saltRounds);

    const dataToCreate: CreateUserDTO = {
      email,
      name,
      last_name,
      address,
      password: hashedPW,
      token,
      status,
    };

    return this.usersRepository.create(dataToCreate);
  }



   
actualizarUsuario(id: number): Promise<any>  {
    return this.usersRepository.findByPk(id).then(user=>{
      user.set({
        status:true,
       });
       user.save();
     return new MessageDto(`usuario actualizado`);
         
    }).catch(error => {console.log("error en Save")});
  }
}
