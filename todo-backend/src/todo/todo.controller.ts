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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
// import type { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // GET - get all todo
  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.AllTodos();
  }

  // GET - get user's all task by userId
  @Get(':id/all-todos')
  getAllTodoOfUser(@Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return this.todoService.AllTodoOfUser(id);
  }

  // POST - create a new todo
  @Post()
  postNewTask(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.newTask(createTodoDto);
  }

  // PATCH - update if the task is done
  @Patch(':id')
  async updateTaskDone(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.taskDone(id, updateTodoDto);
  }

  // PATCH -- assign task to a user
  @Patch(':id/assign')
  updateAssignTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTaskDto: AssignTaskDto,
  ): Promise<Todo> {
    return this.todoService.assignTask(id, assignTaskDto);
  }

  // DELETE - delete the todo
  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeTask(id);
  }
}
