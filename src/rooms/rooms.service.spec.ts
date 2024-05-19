import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Room from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsService', () => {
  let service: RoomsService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    repository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a room successfully', async () => {
      const newRoomDto: CreateRoomDto = {
        room_number: 101,
        price: 100,
        num_beds: 1,
        num_people: 2,
      };

      const mockRoom = { id: 1, ...newRoomDto };
      jest.spyOn(repository, 'create').mockReturnValue(mockRoom as any);
      jest.spyOn(repository, 'save').mockResolvedValue(mockRoom as any);

      expect(await service.create(newRoomDto)).toEqual(mockRoom);
    });
/*
    it('should throw BadRequestException if room_number is undefined', async () => {
      const newRoomDto: CreateRoomDto = {
        price: 100,
        num_beds: 1,
        num_people: 2,
      } as any;

      await expect(service.create(newRoomDto)).rejects.toThrow(BadRequestException);
    });
*/
/*
    it('should throw BadRequestException if price is undefined', async () => {
      const newRoomDto: CreateRoomDto = {
        room_number: 101,
        num_beds: 1,
        num_people: 2,
      } as any;

      await expect(service.create(newRoomDto)).rejects.toThrow(BadRequestException);
    });
*/
    // Add other validation tests similarly
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const mockRooms = [{ room_number: 101 }, { room_number: 102 }];
      jest.spyOn(repository, 'find').mockResolvedValue(mockRooms as any);

      expect(await service.findAll()).toEqual(mockRooms);
    });
  });

  describe('findOne', () => {
    it('should return a room by room_number', async () => {
      const mockRoom = { room_number: 101 };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRoom as any);

      expect(await service.findOne(101)).toEqual(mockRoom);
    });

    it('should throw NotFoundException if room is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  /*describe('getByPrice', () => {
    it('should return rooms by price', async () => {
      const mockRooms = [{ price: 100 }, { price: 100 }];
      jest.spyOn(repository, 'find').mockResolvedValue(mockRooms as any);

      expect(await service.getByPrice(100)).toEqual(mockRooms);
    });

    it('should throw NotFoundException if no rooms found by price', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.getByPrice(999)).rejects.toThrow(NotFoundException);
    });
  });*/

  describe('isOccupied', () => {
    it('should return occupancy status of the room', async () => {
      const mockRoom = { room_number: 101, occupied: true };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockRoom as any);

      expect(await service.isOccupied(101)).toBe(true);
    });

    it('should throw NotFoundException if room is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.isOccupied(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('bookARoom', () => {
    it('should book a room', async () => {
      const mockRoom = { room_number: 101, occupied: false };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockRoom as any);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...mockRoom, occupied: true } as any);

      await service.bookARoom(101);

      expect(mockRoom.occupied).toBe(true);
    });

    it('should throw NotFoundException if room is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.bookARoom(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('unBookARoom', () => {
    it('should unbook a room', async () => {
      const mockRoom = { room_number: 101, occupied: true };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRoom as any);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...mockRoom, occupied: false } as any);

      await service.unBookARoom(101);

      expect(mockRoom.occupied).toBe(false);
    });

    it('should throw NotFoundException if room is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.unBookARoom(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a room', async () => {
      const mockRoom = { room_number: 101 } as any;
      const updateRoomDto: UpdateRoomDto = { price: 150 };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockRoom as any);
      jest.spyOn(repository, 'merge').mockReturnValue({ ...mockRoom, ...updateRoomDto });
      jest.spyOn(repository, 'save').mockResolvedValue({ ...mockRoom, ...updateRoomDto } as any);

      expect(await service.update(101, updateRoomDto)).toEqual({ ...mockRoom, ...updateRoomDto });
    });

    it('should throw NotFoundException if room is not found', async () => {
      const updateRoomDto: UpdateRoomDto = { price: 150 };
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.update(999, updateRoomDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a room', async () => {
      const mockRoom = { room_number: 101 };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockRoom as any);
      jest.spyOn(repository, 'remove').mockResolvedValue(mockRoom as any);

      expect(await service.remove(101)).toEqual(mockRoom);
    });

    it('should throw NotFoundException if room is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});