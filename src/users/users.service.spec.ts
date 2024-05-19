import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dtos/user.dto';
import UpdateUserDto from './dtos/updateuser.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOneByEmail('john@example.com');
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
    });

    it('should throw a NotFoundException if user not found by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findOneByEmail('jane@example.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = { name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' };
      const savedUser = { id: 1, ...createUserDto };

      mockUserRepository.create.mockReturnValue(createUserDto);
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(savedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'John Updated' };
      const existingUser = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' };
      const updatedUser = { ...existingUser, ...updateUserDto };

      mockUserRepository.findOne.mockResolvedValue(existingUser);
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
   
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.update(2, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove and return a user', async () => {
      const user = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' };
      mockUserRepository.findOne.mockResolvedValue(user);
      mockUserRepository.remove.mockResolvedValue(user);

      const result = await service.remove(1);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});