import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodoService {
  todos: any;
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // GET
  async getAllTasks(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // POST
  async createTask(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodos = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodos); // erro r tryrun
  }

  // PATCH
  async updateTask(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const taskFind = await this.todoRepository.findOneBy({ id });
    if (!taskFind) {
      throw new NotFoundException('No Task found for update');
    }
    Object.assign(taskFind, updateTodoDto);
    return await this.todoRepository.save(taskFind);
  }

  // DELETE
  async removeTask(id: number): Promise<void> {
    const result = await this.todoRepository.delete({ id });
    console.log('Which id deleting?:', id);

    if (result.affected === 0) {
      throw new NotFoundException('No --');
    }
    console.log('ok deleted');
  }
}
