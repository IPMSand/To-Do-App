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
// import type { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // get all the tasks -- GET
  @Get()
  async getAllTasks(): Promise<Todo[]> {
    return await this.todoService.getAllTasks();
  }

  // crate new task -- POST
  @Post()
  async createTask(
    @Body('taskName') taskName: string,
    @Body('taskDescription') taskDescription: string,
    @Body('isCompleted') isCompleted: boolean,
    @Body('isCreatedDay') isCreatedDay: Date,
  ): Promise<Todo> {
    return await this.todoService.createTask(
      taskName,
      taskDescription,
      isCompleted,
      isCreatedDay,
    );
  }

  // update the task done-- PUT
  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body('isCompleted') isCompleted: boolean,
  ): Promise<Todo> {
    return this.todoService.updateTask(id, isCompleted);
  }

  // delete a task --- DELETE
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeTask(id);
  }
}
