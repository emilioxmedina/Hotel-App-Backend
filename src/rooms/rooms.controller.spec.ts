import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import Room from './entities/room.entity';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  const mockRoomsService = {
    create: jest.fn().mockImplementation((dto: CreateRoomDto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 1) {
        return {
          id: 1,
          room_number: 101,
          price: 100,
          num_beds: 2,
          num_people: 4,
          occupied: false,
        };
      }
      throw new Error('Room not found');
    }),
    update: jest.fn().mockImplementation((id: number, dto: UpdateRoomDto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: mockRoomsService,
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a room', async () => {
    const createRoomDto: CreateRoomDto = {
      room_number: 101,
      price: 100,
      num_beds: 2,
      num_people: 4,
    };
    const result = await controller.create(createRoomDto);
    expect(result).toEqual({
      id: 1,
      ...createRoomDto,
    });
    expect(service.create).toHaveBeenCalledWith(createRoomDto);
  });

  it('should return an array of rooms', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a room by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      room_number: 101,
      price: 100,
      num_beds: 2,
      num_people: 4,
      occupied: false,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a room', async () => {
    const updateRoomDto: UpdateRoomDto = {
      price: 150,
    };
    const result = await controller.update(1, updateRoomDto);
    expect(result).toEqual({
      id: 1,
      ...updateRoomDto,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateRoomDto);
  });

  it('should delete a room', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({});
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
