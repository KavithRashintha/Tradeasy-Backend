/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Supplier } from './supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "215016G",
      database: "Supplier",
      entities: [Supplier],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Supplier]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
