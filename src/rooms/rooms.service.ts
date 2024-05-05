import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  create(room_number: number, type: string, price: number) {
    return 'This action adds a new room';
  }

  getByPrice(price: number){
    return "this action return get by price room"
  }

  getByType(type: string){
    return "this action return get by type room"
  }

  getByNumber(room_number:number){
    return "this action return get by number room"
  }

  getByPriceType(price: number, type: string){
    return "this action return get by price type room"
  }

  getByOccupied(room_number:number){
    return "this action return get confirmation occupied room"
  }

  bookARoom(room_number:number){
    return "this action return confirmation book a room"
  }

  unBookARoom(room_number:number){
    return "this action return confirmation reserved room"
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
