import { IsDate, IsNumber, IsString } from "class-validator";

export default class CreateReservationDto {
    @IsString()
    init_date: string;
    @IsString()
    end_date: string;
    @IsNumber()
    user: number;
    @IsNumber()
    room: number;

}
