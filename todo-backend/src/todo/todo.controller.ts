import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import type { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // get all the tasks -- GET
  @Get()
  getAllTasks() {
    return this.todoService.getAllTasks();
  }

  // crate new task -- POST
  @Post()
  createTask(
    @Body('taskName') taskName: string,
    @Body('taskDescription') taskDescription: string,
    @Body('isCompleted') isCompleted: boolean,
    @Body('isCreatedDay') isCreatedDay: Date,
  ) {
    return this.todoService.createTask(
      taskName,
      taskDescription,
      isCompleted,
      isCreatedDay,
    );
  }

  // update the task done-- PUT
  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body('isCompleted') isCompleted: boolean,
  ): Todo {
    return this.todoService.updateTask(id, isCompleted);
  }

  // delete a task --- DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.removeTask(id);
  }
}
