import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    createUser(createUserDto: CreateUserDto): unknown;
}
