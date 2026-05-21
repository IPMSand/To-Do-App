import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Get all users
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.AllUsers();
  }

  // Get total task count per user
  @Get('task-count')
  getTaskCount(): Promise<Array<{ userId: number; taskCount: number }>> {
    return this.userService.TaskCount();
  }

  // Get user by ID
  @Get(':id')
  getFindUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findUser(id);
  }

  // Create a new user
  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.newUser(createUserDto);
  }

  // Delete user if tasks are done
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }
}
