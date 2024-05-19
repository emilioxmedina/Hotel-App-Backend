import { Test, TestingModule } from '@nestjs/testing';
import { paymentService } from './payment.service';

describe('PaymentService', () => {
  let service: paymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [paymentService],
    }).compile();

    service = module.get<paymentService>(paymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
