import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body) {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
