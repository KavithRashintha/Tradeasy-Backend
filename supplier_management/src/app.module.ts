/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Supplier } from './supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Supplier],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Supplier]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
