import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import Reservation from './entities/reservations.entity';
import Room from '../rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import CreateReservationDto from './dtos/create-reservations.dto';
import UpdateReservationDto from './dtos/update-reservations.dto';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let reservationRepository: Repository<Reservation>;
  let userRepository: Repository<User>;
  let roomRepository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Room),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new reservation', async () => {
      const reservationData: CreateReservationDto = {
        init_date: '2023-01-01',
        end_date: '2023-01-02',
        user: 1,
        room: 1,
      };

      const user = new User();
      user.id = 1;

      const room = new Room();
      room.id = 1;

      const reservation = new Reservation();
      reservation.id = 1;
      reservation.init_date = new Date(reservationData.init_date);
      reservation.end_date = new Date(reservationData.end_date);
      reservation.users = user;
      reservation.rooms = room;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(reservationRepository, 'create').mockReturnValue(reservation);
      jest.spyOn(reservationRepository, 'save').mockResolvedValue(reservation);

      const result = await service.create(reservationData);

      expect(result).toEqual(reservation);
      expect(reservationRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(reservationRepository.save).toHaveBeenCalledWith(reservation);
    });

    it('should throw an error if init_date is missing', async () => {
      const reservationData: CreateReservationDto = {
        init_date: undefined,
        end_date: '2023-01-02',
        user: 1,
        room: 1,
      };

      await expect(service.create(reservationData)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if end_date is missing', async () => {
      const reservationData: CreateReservationDto = {
        init_date: '2023-01-01',
        end_date: undefined,
        user: 1,
        room: 1,
      };

      await expect(service.create(reservationData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const reservations = [new Reservation(), new Reservation()];
      jest.spyOn(reservationRepository, 'find').mockResolvedValue(reservations);

      const result = await service.findAll();
      expect(result).toEqual(reservations);
      expect(reservationRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a reservation by ID', async () => {
      const reservation = new Reservation();
      reservation.id = 1;
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(reservation);

      const result = await service.findOne(1);
      expect(result).toEqual(reservation);
      expect(reservationRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if reservation not found', async () => {
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a reservation', async () => {
      const reservation = new Reservation();
      reservation.id = 1;
      const updateData: UpdateReservationDto = {
        init_date: '2023-01-03',
        end_date: '2023-01-04'
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(reservation);
      jest.spyOn(reservationRepository, 'merge').mockReturnValue(reservation);
      jest.spyOn(reservationRepository, 'save').mockResolvedValue(reservation);

      const result = await service.update(1, updateData);
      expect(result).toEqual(reservation);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(reservationRepository.merge).toHaveBeenCalledWith(reservation, updateData);
      expect(reservationRepository.save).toHaveBeenCalledWith(reservation);
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const reservation = new Reservation();
      reservation.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(reservation);
      jest.spyOn(reservationRepository, 'remove').mockResolvedValue(reservation);

      await service.remove(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(reservationRepository.remove).toHaveBeenCalledWith(reservation);
    });
  });
});
