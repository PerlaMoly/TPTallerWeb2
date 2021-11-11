import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { ValidUserIdPipe } from './../pipes/valid-user-id.pipe';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';
import {User} from "./users.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateUserDTO} from "./createUser.dto";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDTO> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async newUser(@Body() user: CreateUserDTO): Promise<UserDTO> {
    return await this.usersService.createUser(user);
  }
  //
  // @Put(':id')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // async updateUser(
  //   @Param('id', ValidUserIdPipe) id: string,
  //   @Body() user: UserDTO
  // ): Promise<UserDTO> {
  //   return await this.usersService.updateUser(id, user);
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<void> {
  //   return await this.usersService.deleteUser(id);
  // }
}
