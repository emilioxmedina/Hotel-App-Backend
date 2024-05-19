import { PartialType } from "@nestjs/mapped-types";
import CreateUserDto from "./user.dto";


export default class UpdateUserDto extends PartialType(CreateUserDto) {}