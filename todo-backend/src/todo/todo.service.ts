import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AssignTodoDto } from './dto/assign-task.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // Get all todos
  async AllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // Get all todos by userId
  async AllTodoOfUser(userId: number): Promise<Todo[]> {
    const tasks = await this.todoRepository.find({ where: { userId } });
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for user ID ${userId}`);
    }
    return tasks;
  }

  // Create new todo
  async newTask(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodo);
  }

  // Update task completion state or details
  async taskDone(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const task = await this.todoRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    Object.assign(task, updateTodoDto);
    return await this.todoRepository.save(task);
  }

  // Assign task to a user
  async assignTask(id: number, assignTodoDto: AssignTodoDto): Promise<Todo> {
    const task = await this.todoRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.todoRepository.merge(task, assignTodoDto);
    return await this.todoRepository.save(task);
  }

  // Delete a todo
  async removeTask(id: number): Promise<void> {
    const result = await this.todoRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
