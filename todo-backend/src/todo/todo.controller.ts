import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

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
}
