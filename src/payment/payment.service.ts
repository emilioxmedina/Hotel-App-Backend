import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Payment from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import UpdatePaymentDto from './dto/update-payment.dto';
import User from 'src/users/entities/user.entity';


@Injectable()
export class paymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
        const User = await this.userRepository.findOne({ where: { id: new_payment.userId } });
        if (!User ) {
            throw new NotFoundException(`User with id ${new_payment.userId} not found`);
        }
        const payment = new Payment();
        payment.payment_type = new_payment.payment_type;
        payment.amount = new_payment.amount;
        payment.user = User;
        
        
        return this.paymentRepository.save(payment);
    }

    async update(id: number, update_payment: UpdatePaymentDto) {
        const payment = await this.findOne(id);
        const User = await this.userRepository.findOne({ where: { id: update_payment.userId } });
        if (!User ) {
            throw new NotFoundException(`User with id ${update_payment.userId} not found`);
        }
        payment.payment_type = payment.payment_type;
        payment.amount = payment.amount;
        payment.user = User;
        this.paymentRepository.merge(payment, update_payment);
        return this.paymentRepository.save(payment);
    }

    async remove(id: number) {
        const payment = await this.findOne(id);
        return this.paymentRepository.remove(payment);
    }

}
