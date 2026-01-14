import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // זה השורה החשובה!
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // נצטרך את זה בהמשך למודול Auth
})
export class UsersModule {}
