import { Test, TestingModule } from '@nestjs/testing';
import { paymentService } from './payment.service';
import Payment from './entities/payment.entity';
import { Repository } from 'typeorm';
import User from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import UpdatePaymentDto from './dto/update-payment.dto';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

describe('PaymentService', () => {
  let service: paymentService;
  let paymentRepository: Repository<Payment>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        paymentService,
        {
          provide: getRepositoryToken(Payment),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<paymentService>(paymentService);
    paymentRepository = module.get<Repository<Payment>>(getRepositoryToken(Payment));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const paymentData: CreatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      const user = new User();
      user.id = 1;

      const payment = new Payment();
      payment.id = 1;
      payment.payment_type = paymentData.payment_type;
      payment.amount = paymentData.amount;
      payment.user = user;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(paymentRepository, 'save').mockResolvedValue(payment);

      expect(await service.create(paymentData)).toEqual(payment);
    });

    it('should throw an error if user does not exist', async () => {
      const paymentData: CreatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(paymentData)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a payment', async () => {
      const payment = new Payment();
      payment.id = 1;

      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(payment);

      expect(await service.findOne(1)).toEqual(payment);
    });

    it('should throw an error if payment does not exist', async () => {
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const payment = new Payment();
      payment.id = 1;

      const paymentData: UpdatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      const user = new User();
      user.id = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue(payment);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(paymentRepository, 'save').mockResolvedValue(payment);
      jest.spyOn(paymentRepository, 'merge').mockImplementation((entity, dto) => Object.assign(entity, dto));

      expect(await service.update(1, paymentData)).toEqual(payment);
    });

    it('should throw an error if payment does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {} as UpdatePaymentDto)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an error if user does not exist', async () => {
      const payment = new Payment();
      payment.id = 1;

      const paymentData: UpdatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(payment);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, paymentData)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a payment', async () => {
      const payment = new Payment();
      payment.id = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue(payment);
      jest.spyOn(paymentRepository, 'remove').mockResolvedValue(payment);

      expect(await service.remove(1)).toEqual(payment);
    });

    it('should throw an error if payment does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
    });
  });

  describe('findAll', () => {
    it('should return all payments', async () => {
      const payments = [new Payment(), new Payment()];

      jest.spyOn(paymentRepository, 'find').mockResolvedValue(payments);

      expect(await service.findAll()).toEqual(payments);
    });
  });
});