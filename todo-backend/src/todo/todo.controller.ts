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
import { AssignTodoDto } from './dto/assign-task.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Get all todos
  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.AllTodos();
  }

  // Get user's todos by userId
  @Get(':id/all-todos')
  getAllTodoOfUser(@Param('id', ParseIntPipe) id: number): Promise<Todo[]> {
    return this.todoService.AllTodoOfUser(id);
  }

  // Create a new task
  @Post()
  postNewTask(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.newTask(createTodoDto);
  }

  // Update task details/status
  @Patch(':id')
  async updateTaskDone(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.taskDone(id, updateTodoDto);
  }

  // Assign task to a user
  @Patch(':id/assign')
  updateAssignTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTaskDto: AssignTodoDto,
  ): Promise<Todo> {
    return this.todoService.assignTask(id, assignTaskDto);
  }

  // Delete a task
  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.removeTask(id);
  }
}
