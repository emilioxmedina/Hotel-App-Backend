import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/user.dto';
import UpdateUserDto from './dtos/updateuser.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 1) {
        return {
          id: 1,
          name: 'Test',
          lastname: 'User',
          email: 'test@example.com',
          password: 'hashedpassword',
        };
      }
      throw new Error('User not found');
    }),
    create: jest.fn().mockImplementation((dto: CreateUserDto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateUserDto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an error if user by id not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('User not found'));
    await expect(controller.findOne(2)).rejects.toThrow('User not found');
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password',
    };
    const result = await controller.create(createUserDto);
    expect(result).toEqual({
      id: 1,
      ...createUserDto,
    });
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated',
    };
    const result = await controller.update(1, updateUserDto);
    expect(result).toEqual({
      id: 1,
      ...updateUserDto,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('should throw an error if update user not found', async () => {
    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('User not found'));
    await expect(controller.update(2, {} as UpdateUserDto)).rejects.toThrow('User not found');
  });

  it('should remove a user', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({});
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw an error if remove user not found', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('User not found'));
    await expect(controller.remove(2)).rejects.toThrow('User not found');
  });
});
