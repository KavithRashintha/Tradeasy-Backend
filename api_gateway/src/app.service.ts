import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthDto } from './models/authModel';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async createUser(createAuthDTO: AuthDto): Promise<User> {
    const existingUser = await this.authRepository.findOne({ where: { username: createAuthDTO.username } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const saltOrRounds = 10;
    const password = createAuthDTO.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.authRepository.create({ ...createAuthDTO, password: hash });

    if (createAuthDTO.role === 'customer') {
      console.log("Sending create customer message:", newUser);
      return await this.customerClient.send('CREATE_CUSTOMER', newUser).toPromise();
    } else if (createAuthDTO.role === 'supplier') {
      return await this.supplierClient.send('CREATE_SUPPLIER', newUser).toPromise();
    } else {
      return await this.authRepository.save(newUser);
    }

  }

  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: any) {
    const { password, ...result } = user;
    const token = this.jwtService.sign(result);
    return {
      id: user.id,
      role: user.role,
      access_token: token,
    };
  }

  async logout() {
    return {
      access_token: '',
    };
  }
}
