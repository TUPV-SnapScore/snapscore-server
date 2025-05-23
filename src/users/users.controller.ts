/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('exists')
  async doesEmailExist(@Query('email') email: string) {
    return {
      exists: await this.usersService.doesEmailExist(email.toLowerCase()),
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('firebase/:id')
  async getUserByFirebaseId(@Param('id') id: string) {
    return this.usersService.getUserByFirebaseId(id);
  }

  @Post()
  async createUser(@Body() createUserDto: any) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    const data = { fullName: updateUserDto.fullName };
    return await this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
