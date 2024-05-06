import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  room_number: number;

  @IsNumber()
  price: number;

  @IsNumber()
  num_beds: number;

  @IsNumber()
  num_people: number;

  @IsBoolean()
  @IsOptional()
  occupied?: boolean;
}
