import { Controller, Get, Param, Post, Body, Patch, Delete} from '@nestjs/common';
import { paymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: paymentService) {}

    @Get()
    findAll() {
        return this.paymentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.paymentService.findOne(id);
    }

    @Post()
    create(@Body() body: CreatePaymentDto) {
        return this.paymentService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body) {
        return this.paymentService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.paymentService.remove(id);
    }

}