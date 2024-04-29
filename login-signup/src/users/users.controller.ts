import { Body, Controller ,Post , Param ,Get} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto){
    return this.usersService.createUser(createUserDto);
  }

  //  @Get(':id')
  //  show(@Param('id') id:string){
  //   return this.usersService.showById(+id);
  //  }



}
