import { IsDate, IsNumber } from "class-validator";

export default class CreateReservationDto {
    @IsDate()
    init_date: Date;
    @IsDate()
    end_date: Date;
    @IsNumber()
    user: number;
    @IsNumber()
    room: number;
}