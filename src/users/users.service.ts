import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { EditUserDto } from './edit-user.dto';

@Injectable()
export class UsersService {
  private users = []; // Ваш масив користувачів

  findAllUsers(): any[] {
    return this.users;
  }

  findUsersByParams(login?: string, email?: string): any[] {
    return this.users
      .filter(
        (user) =>
          (!login || user.login === login) && (!email || user.email === email),
      )
      .map((user) => {
        delete user.password;
        return user;
      });
  }
  createUser(createUserDto: CreateUserDto): any {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(editUserDto: EditUserDto): any {
    const user = this.users.find((user) => user.id === editUserDto.id);
    Object.assign(user, editUserDto);
    this.users = this.users.map((user) =>
      user.id === editUserDto.id ? user : user,
    );
    return user;
  }

  findUserById(id: number): any {
    return this.users.find((user) => user.id === id);
  }
}
