import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import CreateReservationDto from './dtos/create-reservations.dto';
import UpdateReservationDto from './dtos/update-reservations.dto';
import Reservation from './entities/reservations.entity';
import User from '../users/entities/user.entity';
import Room from '../rooms/entities/room.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        init_date: '2023-01-01',
        end_date: '2023-01-02',
        user: 1,
        room: 1,
      };

      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const result: Reservation = {
        id: 1,
        init_date: new Date(createReservationDto.init_date),
        end_date: new Date(createReservationDto.end_date),
        users: user,
        rooms: room,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createReservationDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createReservationDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const result: Reservation[] = [{
        id: 1,
        init_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-02'),
        users: user,
        rooms: room,
      }];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a reservation by ID', async () => {
      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const result: Reservation = {
        id: 1,
        init_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-02'),
        users: user,
        rooms: room,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if reservation not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Reservation not found'));

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a reservation', async () => {
      const updateReservationDto: UpdateReservationDto = {
        init_date: '2023-01-03',
        end_date: '2023-01-04',
      };

      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const result: Reservation = {
        id: 1,
        init_date: new Date(updateReservationDto.init_date),
        end_date: new Date(updateReservationDto.end_date),
        users: user,
        rooms: room,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateReservationDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateReservationDto);
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const reservation: Reservation = {
        id: 1,
        init_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-02'),
        users: user,
        rooms: room,
      };

      
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
