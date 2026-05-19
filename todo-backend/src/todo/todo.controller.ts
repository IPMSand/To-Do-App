import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
// import type { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // GET
  @Get()
  async getAllTasks(): Promise<Todo[]> {
    return await this.todoService.getAllTasks();
  }

  // POST
  @Post()
  async createTask(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTask(createTodoDto);
  }

  // PATCH
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTask(id, updateTodoDto);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeTask(id);
  }
}
