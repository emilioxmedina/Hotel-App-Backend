import { IsEmail, IsString } from "class-validator";

export default class CreateUserDto {
    @IsString()
    name: string;
    
    @IsString()
    lastname: string;

    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}