import { PartialType } from "@nestjs/swagger";
import CreateReservationDto from "./create-reservations.dto";

export default class UpdateReservationDto extends PartialType(CreateReservationDto) {}