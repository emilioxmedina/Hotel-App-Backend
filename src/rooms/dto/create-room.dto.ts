import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  room_number: number;

  @IsNumber()
  price: number;

  @IsNumber()
  num_beds: number;

  @IsNumber()
  num_people: number;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  occupied?: boolean;
}
