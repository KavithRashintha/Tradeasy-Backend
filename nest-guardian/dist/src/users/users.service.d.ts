import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(registerUserDto: RegisterUserDto): Promise<User>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
}
