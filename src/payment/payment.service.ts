import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Payment from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import UpdatePaymentDto from './dto/update-payment.dto';


@Injectable()
export class paymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) {}

    findAll() {
        return this.paymentRepository.find();
    }

    async findOne(id: number) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (payment === null) {
            throw new NotFoundException(`Payment with id ${id} not found`);
        }
        return payment;
    }

    async create(new_payment: CreatePaymentDto) {
        const payment = this.paymentRepository.create(new_payment);
        return this.paymentRepository.save(payment);
    }

    async update(id: number, update_payment: UpdatePaymentDto) {
        const payment = await this.findOne(id);
        this.paymentRepository.merge(payment, update_payment);
        return this.paymentRepository.save(payment);
    }

    async remove(id: number) {
        const payment = await this.findOne(id);
        return this.paymentRepository.remove(payment);
    }

}
