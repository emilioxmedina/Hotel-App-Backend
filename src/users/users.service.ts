import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/user.dto';
import UpdateUserDto from './dtos/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user === null) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  create(new_user: CreateUserDto) {
    const user = this.usersRepository.create(new_user);
    return this.usersRepository.save(user);
  }

  async update(id: number, update_user: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, update_user);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
