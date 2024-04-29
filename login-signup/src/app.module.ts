import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
   ConfigModule.forRoot({
    isGlobal:true
   }),
   TypeOrmModule.forRoot({
    // type:process.env.DB_TYPE as any,
    // host:process.env.DB_HOST,
    // port:parseInt(process.env.DB_PORT),
    // username:process.env.DB_USERNAME,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_NAME,
    // entities:[User],
    // synchronize:true,

    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"Ps#md419",
    database:"auth",
    entities:[User],
    synchronize:true,
   }),
   UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
