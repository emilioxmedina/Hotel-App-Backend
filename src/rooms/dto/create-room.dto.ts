import { IsBoolean, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {
    @IsNumber()
    room_number: number;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    type: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    occupied: boolean;
}

