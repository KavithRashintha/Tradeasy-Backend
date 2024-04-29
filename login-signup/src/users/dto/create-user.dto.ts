import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    username: string;

    @IsNotEmpty()
    password:string;

    @IsString()
    role: string;

}