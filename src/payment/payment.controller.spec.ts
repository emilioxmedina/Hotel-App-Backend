import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { paymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { NotFoundException } from '@nestjs/common';
import Payment from './entities/payment.entity';
import User from '../users/entities/user.entity';
import updatePaymentDto from './dto/update-payment.dto';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: paymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: paymentService,
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

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<paymentService>(paymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      const user = new User();
      user.id = 1;

      const result: Payment = {
        id: 1,
        payment_type: createPaymentDto.payment_type,
        amount: createPaymentDto.amount,
        user: user,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createPaymentDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createPaymentDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const user = new User();
      user.id = 1;

      const result: Payment[] = [{
        id: 1,
        payment_type: 'credit card',
        amount: 1000,
        user: user
      }];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      const user = new User();
      user.id = 1;

      const result: Payment = {
        id: 1,
        payment_type: 'credit card',
        amount: 1000,
        user: user
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if payment not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Payment not found'));

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        payment_type: 'credit card',
        amount: 1000,
        userId: 1,
      };

      const user = new User();
      user.id = 1;

      const result: Payment = {
        id: 1,
        payment_type: createPaymentDto.payment_type,
        amount: createPaymentDto.amount,
        user: user,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updatePaymentDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updatePaymentDto);
    });

    it('should throw an error if payment not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Payment not found'));

      await expect(controller.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a payment', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error if payment not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Payment not found'));

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});