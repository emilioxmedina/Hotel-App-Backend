import { IsDate, IsNumber } from "class-validator";

export default class CreateReservationDto {
    @IsDate()
    date: Date;
    @IsNumber()
    user: number;
    @IsNumber()
    room: number;
}