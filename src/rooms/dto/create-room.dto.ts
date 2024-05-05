import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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
    @IsOptional()
    occupied?: boolean;
}

